import { Component, OnDestroy } from "@angular/core"
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { Subscription } from "rxjs"
import { passwordAtLeastOneLowercase, passwordAtLeastOneNonAlphanumeric, passwordAtLeastOneNumber, passwordAtLeastOneUppercase } from "src/app/modules/auth/validators/password-validator"
import { AuthResponse } from "../../models/auth-response"
import { User } from "../../models/user"
import { UserService } from "../../services/user.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnDestroy {

  constructor (
    private userService: UserService,
    private router: Router) { }



  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ])
  }, [
    passwordAtLeastOneNumber("password"),
    passwordAtLeastOneLowercase("password"),
    passwordAtLeastOneUppercase("password"),
    passwordAtLeastOneNonAlphanumeric("password")
  ])




  email: AbstractControl = this.loginForm.controls.email
  password: AbstractControl = this.loginForm.controls.password

  loginSubscription: Subscription | undefined
  failedLoginMessage: string | undefined

  login(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched()
      return
    }
    const user: User = {
      email: this.email.value,
      password: this.password.value
    }
    this.loginSubscription?.unsubscribe()
    this.loginSubscription = this.userService.login(user)
      .subscribe((response: AuthResponse | any): void => {
        const data: AuthResponse = response as AuthResponse
        if (data.success === true) {
          // success login
          console.log(data)
          this.userService.setAuthorizationToken(data)
          this.router.navigateByUrl("home")
        }

      }, (error: any) => {
        this.failedLoginMessage = error.message
      },
        (): void => {
          this.userService.userEvent.emit("Login Success")
        })
  }

  goToRegisterComponent = (): Promise<void> => this.router.navigateByUrl("auth/register").then((value: boolean): void => {

  })

  // add animation
  closeNotification = (): undefined => this.failedLoginMessage = undefined


  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
  }

}
