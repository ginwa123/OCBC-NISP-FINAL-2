import {Injectable} from "@angular/core"
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {from, Observable, throwError} from "rxjs"
import {UserService} from "../modules/auth/services/user.service"
import {catchError, finalize} from "rxjs/operators"
import {NgxSpinnerService} from "ngx-spinner"
import {AuthResponse} from "../modules/auth/models/auth-response"
import {User} from "../modules/auth/models/user"
import {ToastrService} from "ngx-toastr"

@Injectable()
export class PaymentInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show()
    const jwtToken: string | null = this.userService.myJwtToken()
    request = request.clone({setHeaders: {Authorization: `Bearer ${jwtToken}`}})
    return next.handle(request)
      .pipe(finalize(() => this.spinner.hide()),
        catchError(error => from(this.handleError(error, request, next))
        ))
  }

  async handleError(error: any, request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      const user: User = {
        token: this.userService.myJwtToken(),
        refreshToken: this.userService.myRefreshToken()
      }
      await this.userService.refreshToken(user).toPromise()
        .then(response => {
          const data: AuthResponse = response as AuthResponse
          this.userService.setAuthorizationToken(data)
          const jwtToken = this.userService.myJwtToken()
          request = request.clone({setHeaders: {Authorization: `Bearer ${jwtToken}`}})
          this.toast.info("JWT token updated", "Ginwa System", {
            timeOut: 1000
          })

        })
      return next.handle(request).toPromise()
    }
    console.log(error)
    return throwError(request.body).toPromise()
  }

}

