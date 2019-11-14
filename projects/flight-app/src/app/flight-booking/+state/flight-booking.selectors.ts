
import { FlightBookingAppState, FlightBookingState } from "./flight-booking.reducer";
import { createSelector, createFeatureSelector } from "@ngrx/store";


export const getAllFlights = 
    (a: FlightBookingAppState) => a.flightBooking.flights;


export const getFlightsWithStats = createSelector(
    (a: FlightBookingAppState) => a.flightBooking.flights,
    (a: FlightBookingAppState) => a.flightBooking.stats,
    (flights, stats) => [flights, stats] 
);


export const getVisibleFlights = createSelector(
    (a: FlightBookingAppState) => a.flightBooking.flights,
    (a: FlightBookingAppState) => a.flightBooking.negativeList,
    (flights, negativeList) => flights.filter(f => !negativeList.includes(f.id))
);



export const getFlightBookingFeature = 
    createFeatureSelector<FlightBookingState>('flightBooking')

export const getFlights = createSelector(
    getFlightBookingFeature,
    (fbs) => fbs.flights
);

export const getBlacklist = createSelector(
    getFlightBookingFeature,
    (fbs) => fbs.negativeList
);

export const getVisibleFlights2 = createSelector(
    getFlights,
    getBlacklist,
    (flights, negativeList) => flights.filter(f => !negativeList.includes(f.id))
);
