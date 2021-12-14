import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DeletePaymentFormComponent } from "./delete-payment-form.component";

describe("DeletePaymentFormComponent", () => {
  let component: DeletePaymentFormComponent;
  let fixture: ComponentFixture<DeletePaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
