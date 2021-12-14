import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "./components/home/home.component"
import { PageNotFound404Component } from "./components/page-not-found404/page-not-found404.component"
import { LoginComponent } from "./modules/auth/components/login/login.component"
import { RegisterComponent } from "./modules/auth/components/register/register.component"
import { AuthGuard } from "./modules/auth/guards/auth.guard"
import { CreatePaymentFormComponent as CreatePaymentFormComponent } from "./modules/payment/components/create-payment-form/create-payment-form.component"
import { DeletePaymentFormComponent } from "./modules/payment/components/delete-payment-form/delete-payment-form.component"
import { UpdatePaymentFormComponent } from "./modules/payment/components/update-payment-form/update-payment-form.component"

const routes: Routes = [
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "auth",
    canActivate: [AuthGuard],
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "payments",
    outlet: "modal",
    // canActivate: [AuthGuard],
    children: [
      {
        path: "create",
        component: CreatePaymentFormComponent
      },
      {
        path: "delete/:id",
        component: DeletePaymentFormComponent
      },
      {
        path: "update/:id",
        component: UpdatePaymentFormComponent
      }
    ]
  },
  {
    path: "**",
    component: PageNotFound404Component
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
