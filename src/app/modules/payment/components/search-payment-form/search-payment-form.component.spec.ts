import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaymentFormComponent } from './search-payment-form.component';

describe('SearchPaymentFormComponent', () => {
  let component: SearchPaymentFormComponent;
  let fixture: ComponentFixture<SearchPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
