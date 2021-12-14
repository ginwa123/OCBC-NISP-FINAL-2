/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { PaymentInterceptor } from "./payment.interceptor"



/** Http interceptor providers in outside-in order */
export const paymentHttpInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: PaymentInterceptor, multi: true },
]
