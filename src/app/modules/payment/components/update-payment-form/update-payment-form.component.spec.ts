import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentFormComponent } from './update-payment-form.component';

describe('UpdatePaymentFormComponent', () => {
  let component: UpdatePaymentFormComponent;
  let fixture: ComponentFixture<UpdatePaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
