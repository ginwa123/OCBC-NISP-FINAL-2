import { Component, OnDestroy } from "@angular/core"
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { Subscription } from "rxjs"
import { passwordAtLeastOneLowercase, passwordAtLeastOneNonAlphanumeric, passwordAtLeastOneNumber, passwordAtLeastOneUppercase, passwordConfirmMatch } from "src/app/modules/auth/validators/password-validator"
import { AuthResponse } from "../../models/auth-response"
import { User } from "../../models/user"
import { UserService } from "../../services/user.service"

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnDestroy {

  constructor (
    private userService: UserService,
    private router: Router) { }
  registerForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required,]),
    confirmPassword: new FormControl("", [Validators.required]),
  }, [
    passwordConfirmMatch("password", "confirmPassword"),
    passwordAtLeastOneNumber("password"),
    passwordAtLeastOneLowercase("password"),
    passwordAtLeastOneUppercase("password"),
    passwordAtLeastOneNonAlphanumeric("password")
  ])
  email: AbstractControl = this.registerForm.controls.email
  password: AbstractControl = this.registerForm.controls.password
  username: AbstractControl = this.registerForm.controls.username
  confirmPassword: AbstractControl = this.registerForm.controls.confirmPassword
  failedRegisterMessage: string | undefined = undefined
  failedRegisterErrors: [] = []
  registerSubscription: Subscription | undefined
  successMessage: string | undefined = undefined

  register(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched()
      return
    }
    const user: User = {
      username: this.email.value,
      email: this.email.value,
      password: this.password.value
    }
    this.registerSubscription?.unsubscribe()
    this.registerSubscription = this.userService.register(user)
      .subscribe((response: AuthResponse | any): void => {
        const data: AuthResponse = response as AuthResponse
        if (data.success === true) {
          // success login
          console.log(data)
          this.successMessage = "Account created, now you can login"
          this.registerForm.reset()
        }

      }, (error: any): void => {
        this.failedRegisterMessage = error.message
        this.failedRegisterErrors = error.errors
      },
        (): void => { 
          this.userService.userEvent.emit("Create account Success")
        })
  }

  goToLoginComponent = (): Promise<void> => this.router.navigateByUrl("auth/login").then((value: boolean): void => {

  })

  closeNotification(): void {
    this.failedRegisterMessage = undefined
    this.successMessage = undefined
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
  }
}
