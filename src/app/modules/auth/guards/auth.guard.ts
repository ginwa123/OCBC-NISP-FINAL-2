import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable, Subscription } from "rxjs"
import { AuthResponse } from "../models/auth-response"
import { User } from "../models/user"
import { UserService } from "../services/user.service"

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isLoggedIn()) {
      if (state.url === "/auth/login" || state.url === "/auth/register") {
        this.router.navigateByUrl("home")
      }
      return true
    }
    // not logged in
    if (state.url === "/auth/login" || state.url === "/auth/register") {
      // not logged in but in auth page
      return true
    }
    // redirect to auth login
    this.router.navigateByUrl("/auth/login")
    return false



  }

  constructor (private userService: UserService, private router: Router) {

  }



}
