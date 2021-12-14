import { DatePipe } from "@angular/common"
import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core"
import { AbstractControl, FormControl, FormControlName, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { animateCSS } from "../../helpers/animate-css"
import { Payment } from "../../models/payment"
import { PaymentResponse } from "../../models/payment-response"
import { PaymentService } from "../../services/payment.service"

@Component({
  selector: "app-update-payment-form",
  templateUrl: "./update-payment-form.component.html",
  styleUrls: ["./update-payment-form.component.css"]
})
export class UpdatePaymentFormComponent implements OnInit, OnDestroy {


  constructor (
    private paymentService: PaymentService,
    private router: Router,
    private datePipe: DatePipe,
    activatedRouter: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    this.paramsId = activatedRouter.snapshot.params.id
  }
  updateFormGroup: FormGroup = new FormGroup({
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
  cardOwnerName: AbstractControl = this.updateFormGroup.controls.cardOwnerName
  cardNumber: AbstractControl = this.updateFormGroup.controls.cardNumber
  expirationDate: AbstractControl = this.updateFormGroup.controls.expirationDate
  securityCode: AbstractControl = this.updateFormGroup.controls.securityCode
  paramsId: number
  payment: Payment | undefined = undefined
  getPaymentSubscription: Subscription | undefined
  updatePaymentSubscription: Subscription | undefined

  ngOnInit(): void {
    this.getPayment(this.paramsId)
  }

  setUpdateForm(): void {
    const dateString: string | undefined = this.payment?.expirationDate
    this.cardOwnerName.setValue(this.payment?.cardOwnerName)
    this.cardNumber.setValue(this.payment?.cardNumber)
    this.securityCode.setValue(this.payment?.securityCode)
    this.expirationDate.setValue(this.datePipe.transform(dateString, "yyyy-MM-dd"))
  }

  getPayment(id: number): void {
    this.getPaymentSubscription?.unsubscribe()
    this.getPaymentSubscription = this.paymentService.getPayment(id)
      .subscribe((response: PaymentResponse | any): void => {
        const data: PaymentResponse = response as PaymentResponse
        if (data.success) {
          this.payment = data.data
          this.setUpdateForm()
        }
      })
  }

  updatePayment(): void {
    if (!this.updateFormGroup.valid) {
      this.updateFormGroup.markAllAsTouched()
      return
    }
    const payment: Payment = {
      paymentDetailId: this.paramsId,
      cardNumber: this.cardNumber.value,
      cardOwnerName: this.cardOwnerName.value,
      expirationDate: this.expirationDate.value,
      securityCode: this.securityCode.value
    }
    this.updatePaymentSubscription = this.paymentService.updatePayment(payment)
      .subscribe((response: PaymentResponse | any): void => {
      }, error => {
      }, () => {
        this.closeModal()
        this.paymentService.paymentEvent.emit("update payment success")
      })
    this.updateFormGroup.reset()
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
    this.getPaymentSubscription?.unsubscribe()
  }


}
