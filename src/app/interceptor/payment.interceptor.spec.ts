import { TestBed } from "@angular/core/testing";

import { PaymentInterceptor } from "./payment.interceptor";

describe("PaymentInterceptor", () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PaymentInterceptor
      ]
  }));

  it("should be created", () => {
    const interceptor: PaymentInterceptor = TestBed.inject(PaymentInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
