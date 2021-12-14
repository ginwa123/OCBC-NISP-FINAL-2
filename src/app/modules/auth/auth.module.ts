import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from "./components/register/register.component";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
