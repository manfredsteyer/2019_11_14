import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { loadFlights, flightsLoaded } from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';


@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() => this.actions$.pipe(
    ofType(loadFlights),
    switchMap(a => this.flightService.find(a.from, a.to, a.urgent)),
    map(flights => flightsLoaded({flights})),
  ));

  constructor(private flightService: FlightService, private actions$: Actions) {}

}
