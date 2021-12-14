import { Payment } from "./payment"

export interface PaymentResponse {
  message: string,
  success: boolean,
  data: Payment | Payment[] | any
}
