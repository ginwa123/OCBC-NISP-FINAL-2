export interface Payment {
  paymentDetailId?: number,
  cardOwnerName: string,
  cardNumber: number,
  securityCode: string,
  expirationDate: string,
}
