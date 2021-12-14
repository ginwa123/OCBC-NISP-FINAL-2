import { HttpClient } from "@angular/common/http"
import { EventEmitter, Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { catchError, delay, retry, retryWhen, take, tap } from "rxjs/operators"
import { endPoint } from "src/app/app.module"
import { Payment } from "../models/payment"

@Injectable({
  providedIn: "root"
})
// catch error in interceptor
export class PaymentService {
  endPoint: string = endPoint
  constructor (
    private httpClient: HttpClient
  ) { }
  payments: Payment[] = []
  paymentEvent: EventEmitter<string> = new EventEmitter<string>()

  createPayment(payment: Payment): Observable<Object> {
    return this.httpClient
      .post(`${this.endPoint}/api/paymentdetail`, payment)
      // .pipe(retry(2))

  }

  getPayments(): Observable<Object> {
    return this.httpClient
      .get(`${this.endPoint}/api/paymentdetail`)
      // .pipe(retry(2))

  }

  getPayment(id: number): Observable<Object> {
    return this.httpClient
      .get(`${this.endPoint}/api/paymentdetail/${id}`)
      // .pipe(retry(2))

  }

  deletePayment(id: number): Observable<Object> {
    return this.httpClient
      .delete(`${this.endPoint}/api/paymentdetail/${id}`)
      // .pipe(retry(2))

  }

  searchPayment(sortType: string = "id", orderBy: string = "asc", searchKeyword: string = ""): Payment[] {
    let payments = [...this.payments]
    if (sortType === "cardOwnerName") {
      payments = payments.sort((a: Payment, b: Payment) => {
        const cardOwnerNameA = a?.cardOwnerName
        const cardOwnerNameB = b?.cardOwnerName
        if (orderBy === "asc") return ("" + cardOwnerNameA).localeCompare(cardOwnerNameB)
        else return ("" + cardOwnerNameB).localeCompare(cardOwnerNameA)
      })
      payments = payments.filter((payment) => {
        const userName: string = payment.cardOwnerName
        return userName.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
      })
    }

    return payments
  }

  updatePayment(payment: Payment): Observable<Object> {
    return this.httpClient
      .put(`${this.endPoint}/api/paymentdetail/${payment.paymentDetailId}`, payment)
      // .pipe(retry(2))
  }
}
