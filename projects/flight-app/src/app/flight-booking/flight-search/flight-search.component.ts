import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-api';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights } from '../+state/flight-booking.actions';
import { getAllFlights, getVisibleFlights } from '../+state/flight-booking.selectors';
import { FlightBookingFacade } from '../+state/flight-booking.facade';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$ = this.facade.flights$;

  constructor(
    private facade: FlightBookingFacade,
    private flightService: FlightService) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;
    this.facade.search(this.from, this.to, this.urgent);
    
  }

  delay(): void {
    this.facade.delay();
  }

}
