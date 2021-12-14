import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core"
import {FormControl} from "@angular/forms"
import {Subscription} from "rxjs"

@Component({
  selector: "app-search-payment-form",
  templateUrl: "./search-payment-form.component.html",
  styleUrls: ["./search-payment-form.component.css"]
})
export class SearchPaymentFormComponent implements OnInit, OnDestroy {
  @Output() inputSearchUserEvent: EventEmitter<string> = new EventEmitter<string>()
  searchKeyword: FormControl = new FormControl()
  searchKeywordSubscription: Subscription | undefined
  constructor() { }

  ngOnInit(): void {
    this.searchKeywordSubscription = this.searchKeyword.valueChanges.subscribe(value => {
      this.inputSearchUserEvent.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.inputSearchUserEvent?.unsubscribe()
  }



}
