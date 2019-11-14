import { Component, OnInit } from '@angular/core';
import { PassengerAppState, selectAll, selectEntities, PassengerState, selectAllPassengers } from '../passenger.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Passenger } from '../passenger.model';
import { addPassenger } from '../passenger.actions';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  passengers$ = this.store.select(selectAllPassengers);

  constructor(private store: Store<PassengerAppState>) { 
  }

  ngOnInit() {
    this.store.dispatch(addPassenger({ passenger: { id: "17", firstName: 'Max', name: 'Muster'}}));
  }

}
