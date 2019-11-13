import { Action, createReducer, on } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded, updateFlight } from './flight-booking.actions';

export interface FlightBookingAppState {
  flightBooking: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[],
  basket: object,
  stats: object
}

export const initialState: FlightBookingState = {
  flights: [],
  basket: {},
  stats: {}
};

const flightBookingReducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {
    const flights = action.flights;

    // Mutable
    // state.flights = flights;

    return { ...state, flights }

  }),
  on(updateFlight, (state, action) => {
    const flight = action.flight;

    const flights = state.flights.map(f => f.id === flight.id ? flight :  f);

    // Mutable
    // state.flights = flights;

    return { ...state, flights }

  }),

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
