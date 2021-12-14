import { NgModule } from "@angular/core"
import { CommonModule, DatePipe } from "@angular/common"
import { CreatePaymentFormComponent } from "./components/create-payment-form/create-payment-form.component"
import { UpdatePaymentFormComponent } from "./components/update-payment-form/update-payment-form.component"
import { DeletePaymentFormComponent } from "./components/delete-payment-form/delete-payment-form.component"
import { ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { TablePaymentComponent } from "./components/table-payment/table-payment.component";
import { SearchPaymentFormComponent } from './components/search-payment-form/search-payment-form.component'

@NgModule({
  declarations: [
    CreatePaymentFormComponent,
    UpdatePaymentFormComponent,
    DeletePaymentFormComponent,
    TablePaymentComponent,
    SearchPaymentFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    TablePaymentComponent
  ],
  providers: [
    DatePipe,
  ]
})
export class PaymentModule { }
