import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { animateCSS } from "../../helpers/animate-css"
import { Payment } from "../../models/payment"
import { PaymentResponse } from "../../models/payment-response"
import { PaymentService } from "../../services/payment.service"

@Component({
  selector: "app-delete-payment-form",
  templateUrl: "./delete-payment-form.component.html",
  styleUrls: ["./delete-payment-form.component.css"]
})
export class DeletePaymentFormComponent implements OnInit, OnDestroy {

  constructor (
    private paymentService: PaymentService,
    private router: Router,
    activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    this.paramsId = activatedRoute.snapshot.params.id
  }
  paramsId: number
  deletePaymentSubscription: Subscription | undefined
  getPaymentSubscription: Subscription | undefined
  payment: Payment | undefined = undefined
  isButtonDisabled: boolean = true

  ngOnInit(): void {
    this.getPayment(this.paramsId)
  }

  deletePayment(): void {
    this.deletePaymentSubscription?.unsubscribe()
    this.deletePaymentSubscription = this.paymentService.deletePayment(this.paramsId)
      .subscribe((value: any): void => {
      }, error => {
      },
        () => {
          this.closeModal()
          this.paymentService.paymentEvent.emit("Delete payment success")
        })
    this.isButtonDisabled = true
  }

  getPayment(id: number): void {
    this.getPaymentSubscription?.unsubscribe()
    this.getPaymentSubscription = this.paymentService.getPayment(id)
      .subscribe((response: PaymentResponse | any): void => {
        const data: PaymentResponse = response as PaymentResponse
        if (data.success) {
          this.payment = data.data
          this.isButtonDisabled = false
        }
      },error => alert(JSON.stringify(error)))
  }

  closeModal(): void {
    animateCSS(".modal-background", "fadeOut")
    animateCSS(".modal-card", "fadeOutUp").then((message: any) => {
      const modalCard = this.elementRef.nativeElement.querySelector(".modal")
      modalCard.classList.toggle("is-active")
      this.router.navigateByUrl("home")
    })
  }


  ngOnDestroy(): void {
    this.deletePaymentSubscription?.unsubscribe()
    this.getPaymentSubscription?.unsubscribe()
  }

}
