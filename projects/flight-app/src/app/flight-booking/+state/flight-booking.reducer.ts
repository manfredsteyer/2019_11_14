import { Action, createReducer, on } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded, updateFlight, loadFlights } from './flight-booking.actions';
import { mutableOn } from 'ngrx-etc';

export interface FlightBookingAppState {
  flightBooking: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[],
  basket: object,
  stats: object,
  negativeList: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  basket: {},
  stats: {},
  negativeList: [3]
};

const flightBookingReducer = createReducer(
  initialState,

  mutableOn(flightsLoaded, (state, action) => {
    const flights = action.flights;

    // Mutable
    state.flights = flights;

    // Immutable
    // return { ...state, flights }

  }),
  mutableOn(updateFlight, (state, action) => {
    const flight = action.flight;

    const flights = state.flights.map(f => f.id === flight.id ? flight :  f);

    // Mutable
    state.flights = flights;

    // Immutable
    // return { ...state, flights }


  }),

  mutableOn(loadFlights, (state, action) => {
    state.flights = [];
    // state.showSpinner = true;
  })

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
