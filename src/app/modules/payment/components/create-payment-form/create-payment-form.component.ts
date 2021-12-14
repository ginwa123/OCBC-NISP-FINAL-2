import { Component, ElementRef, OnDestroy } from "@angular/core"
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { Subscription } from "rxjs"
import { animateCSS } from "../../helpers/animate-css"
import { Payment } from "../../models/payment"
import { PaymentResponse } from "../../models/payment-response"
import { PaymentService } from "../../services/payment.service"

@Component({
  selector: "app-create-payment-form",
  templateUrl: "./create-payment-form.component.html",
  styleUrls: ["./create-payment-form.component.css"]
})
export class CreatePaymentFormComponent implements OnDestroy {


  constructor (
    private paymentService: PaymentService,
    private router: Router,
    private elementRef: ElementRef
  ) {

  }
  createFormGroup: FormGroup = new FormGroup({
    cardOwnerName: new FormControl("", [
      Validators.required,
      Validators.maxLength(100)
    ]),
    cardNumber: new FormControl("", [
      Validators.required,
      Validators.max(10000000)
    ]),
    expirationDate: new FormControl("", [Validators.required]),
    securityCode: new FormControl("", [
      Validators.required,
      Validators.maxLength(100)
    ])
  })
  cardOwnerName: AbstractControl = this.createFormGroup.controls.cardOwnerName
  cardNumber: AbstractControl = this.createFormGroup.controls.cardNumber
  expirationDate: AbstractControl = this.createFormGroup.controls.expirationDate
  securityCode: AbstractControl = this.createFormGroup.controls.securityCode
  createPaymentSubscription: Subscription | undefined
  test: boolean = false
  createPayment(): void {
    if (!this.createFormGroup.valid) {
      this.createFormGroup.markAllAsTouched()
      return
    }
    const payment: Payment = {
      cardNumber: this.cardNumber.value,
      cardOwnerName: this.cardOwnerName.value,
      expirationDate: this.expirationDate.value,
      securityCode: this.securityCode.value
    }
    this.createPaymentSubscription?.unsubscribe()
    this.createPaymentSubscription = this.paymentService.createPayment(payment)
      .subscribe((response: PaymentResponse | any): void => {
      }, error => {
      }, () => {
        this.paymentService.paymentEvent.emit("Create a new payment")
        this.closeModal()
      })
    this.createFormGroup.reset()
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
    this.createPaymentSubscription?.unsubscribe()
  }




}
