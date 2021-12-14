import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NavbarComponent } from "./components/navbar/navbar.component"
import { FooterComponent } from "./components/footer/footer.component"
import { HomeComponent } from "./components/home/home.component"
import { AuthModule } from "./modules/auth/auth.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ToastrModule } from "ngx-toastr"
import { PaymentModule } from "./modules/payment/payment.module"
import { PageNotFound404Component } from "./components/page-not-found404/page-not-found404.component"
import { NgxSpinnerModule } from "ngx-spinner"
import { paymentHttpInterceptorProvider } from "./interceptor"
// export const endPoint: string = "http://localhost:5000"
export const endPoint: string = "https://final-project-csharp.herokuapp.com"
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PaymentModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    paymentHttpInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
