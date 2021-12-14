import {Component, OnDestroy, OnInit} from "@angular/core"
import {Router} from "@angular/router"
import {Subscription} from "rxjs"
import {Payment} from "../../models/payment"
import {PaymentService} from "../../services/payment.service"
import {FormControl} from "@angular/forms"

@Component({
  selector: "app-table-payment",
  templateUrl: "./table-payment.component.html",
  styleUrls: ["./table-payment.component.css"]
})
export class TablePaymentComponent implements OnInit, OnDestroy {

  constructor(
    private paymentService: PaymentService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getPayments()
    this.listenPaymentEvent()
  }

  payments: Payment[] = []
  getPaymentsSubscription: Subscription | undefined
  paymentEventSubscription: Subscription | undefined
  sortType: string | undefined = "cardOwnerName"
  orderBy: string = "asc"
  searchKeyword: string = ""

  getPayments(): void {
    this.getPaymentsSubscription?.unsubscribe()
    this.getPaymentsSubscription = this.paymentService.getPayments()
      .subscribe((response: PaymentResponse | any): void => {
        const data = response.data as Payment[]
        this.payments = data
        this.paymentService.payments = this.payments
        this.payments = this.paymentService.searchPayment(this.sortType, this.orderBy, this.searchKeyword)
      })
  }

  ngOnDestroy(): void {
    this.getPaymentsSubscription?.unsubscribe()
  }

  goToDeleteComponent = (id: number | undefined): Promise<boolean> =>
    this.router.navigate([{outlets: {modal: ["payments", "delete", id],}}])

  goToUpdateComponent = (id: number | undefined): Promise<boolean> =>
    this.router.navigate([{outlets: {modal: ["payments", "update", id],}}])

  goToCreateComponent = (): Promise<boolean> =>
    this.router.navigate([{outlets: {modal: ["payments", "create"],}}])

  listenPaymentEvent(): void {
    this.paymentEventSubscription = this.paymentService.paymentEvent.subscribe((value: string): void => {
      this.getPayments()
    })
  }

  setOrderBy(): void {
    if (this.orderBy === "asc") this.orderBy = "desc"
    else this.orderBy = "asc"
    this.payments = this.paymentService.searchPayment(this.sortType, this.orderBy, this.searchKeyword)
  }

  searchPayment(value: string): void {
    console.log(value)
    this.searchKeyword = value
    this.payments = this.paymentService.searchPayment(this.sortType, this.orderBy, this.searchKeyword)
  }


}
