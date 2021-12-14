import { Component, OnDestroy, OnInit } from "@angular/core"
import { ToastrService } from "ngx-toastr"
import { Subscription } from "rxjs"
import { UserService } from "./modules/auth/services/user.service"
import { PaymentService } from "./modules/payment/services/payment.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy, OnInit {
  title = "finalAssignment2";
  paymentServiceSubscription: Subscription | undefined
  userServiceSubscription: Subscription | undefined

  constructor (
    private toast: ToastrService,
    private paymentService: PaymentService,
    private userService: UserService) {

  }
  ngOnInit(): void {
    // listening payment service
    this.paymentServiceSubscription = this.paymentService.paymentEvent.subscribe(response => {
      this.toast.success(response, "Payment Service")
    })
    this.userServiceSubscription = this.userService.userEvent.subscribe(response => {
      this.toast.success(response, "User Service")
    })
  }
  ngOnDestroy(): void {
    this.paymentServiceSubscription?.unsubscribe()
    this.userServiceSubscription?.unsubscribe()
  }


}
