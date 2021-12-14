import { HttpClient, HttpHeaders } from "@angular/common/http"
import { EventEmitter, Injectable } from "@angular/core"
import { User } from "../models/user"
import { catchError } from "rxjs/operators"
import { Observable } from "rxjs"
import { AuthResponse } from "../models/auth-response"
import { Router } from "@angular/router"
import { endPoint } from "../../../app.module"
@Injectable({
  providedIn: "root"
})
export class UserService {

  endPoint: string = endPoint
  constructor (
    private httpCLient: HttpClient,
    private router: Router) { }

  userEvent: EventEmitter<string> = new EventEmitter<string>()

  myJwtToken = (): string | null => localStorage.getItem("jwtAccessToken")
  myRefreshToken = (): string | null => localStorage.getItem("refreshToken")

  login(user: User): Observable<Object> {
    return this.httpCLient
      .post(`${this.endPoint}/api/auth/login`, user)
  }

  logout(): void {
    localStorage.removeItem("jwtAccessToken")
    localStorage.removeItem("refreshToken")
    this.router.navigateByUrl("auth/login")
  }

  register(user: User): Observable<Object> {
    return this.httpCLient
      .post(`${this.endPoint}/api/auth/register`, user)
  }

  refreshToken(user: User): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.httpCLient
      .post(`${this.endPoint}/api/auth/refreshtoken`, user, httpOptions)
  }

  checkToken(tokenRequest: { token: string | null; refreshToken: string | null }): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.httpCLient
      .post(`${this.endPoint}/api/auth/checktoken`, tokenRequest, httpOptions)
  }

  getUser(id: number): Observable<Object> {
    return this.httpCLient
      .get(`${this.endPoint}/api/auth/users/id`)
  }

  isLoggedIn(): boolean {
    const myJwtToken: string | null = this.myJwtToken()
    const myRefreshToken: string | null = this.myRefreshToken()
    if (myJwtToken !== null && myRefreshToken !== null) return true
    return false
  }

  setJwtToken = (token: string): void =>
    localStorage.setItem("jwtAccessToken", token)

  setRefreshToken = (refreshToken: string): void =>
    localStorage.setItem("refreshToken", refreshToken)

  setAuthorizationToken(data: AuthResponse): void {
    this.setJwtToken(data.token)
    this.setRefreshToken(data.refreshToken)
  }
}
