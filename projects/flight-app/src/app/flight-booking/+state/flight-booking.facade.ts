
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { FlightBookingAppState } from './flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights, updateFlight } from './flight-booking.actions';
import { getVisibleFlights } from './flight-booking.selectors';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FlightBookingFacade {

    // Step 4
    flights$: Observable<Flight[]> = this.store.select(s => s.flightBooking.flights);

    constructor(
        private store: Store<FlightBookingAppState>) { }

    search(from: string, to: string, urgent: boolean): void {
        this.store.dispatch(loadFlights({ from, to, urgent}));
    }



    // Step 1
    // private flightsSubject = new BehaviorSubject<Flight[]>([]);
    // flights$: Observable<Flight[]> = this.flightsSubject.asObservable();

    // constructor(private flightService: FlightService) { }

    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe(
    //         flights => { 
    //             this.flightsSubject.next(flights);
    //         },
    //         err => console.error('err', err)
    //     )
    // }


    // Step 2
    // flights$: Observable<Flight[]> = this.store.select(s => s.flightBooking.flights);

    // constructor(
    //     private flightService: FlightService,
    //     private store: Store<FlightBookingAppState>) { }

    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe(
    //         flights => { 
    //             this.store.dispatch(flightsLoaded({flights}))
    //         },
    //         err => console.error('err', err)
    //     )
    // }

    // Step 3
    // flights$: Observable<Flight[]> = this.store.select(getVisibleFlights);

    // constructor(
    //     private flightService: FlightService,
    //     private store: Store<FlightBookingAppState>) { }

    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe(
    //         flights => { 
    //             this.store.dispatch(flightsLoaded({flights}))
    //         },
    //         err => console.error('err', err)
    //     )
    // }    

    delay(): void {
        this.flights$.pipe(first()).subscribe(flights => {
            const flight = flights[0];
            flight.date = new Date().toISOString();
            this.store.dispatch(updateFlight({flight}));
        });
    }
   
}