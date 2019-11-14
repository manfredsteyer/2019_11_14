import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Passenger } from './passenger.model';
import * as PassengerActions from './passenger.actions';


export interface PassengerAppState {
  passenger: PassengerState;
}

export interface PassengerState extends EntityState<Passenger> {
  selected: boolean;
}

export const adapter: EntityAdapter<Passenger> = createEntityAdapter<Passenger>();

export const initialState: PassengerState = adapter.getInitialState({
  selected: false
});

const passengerReducer = createReducer(
  initialState,
  on(PassengerActions.addPassenger,
    (state, action) => adapter.addOne(action.passenger, state)
  ),
  on(PassengerActions.upsertPassenger,
    (state, action) => adapter.upsertOne(action.passenger, state)
  ),
  on(PassengerActions.addPassengers,
    (state, action) => adapter.addMany(action.passengers, state)
  ),
  on(PassengerActions.upsertPassengers,
    (state, action) => adapter.upsertMany(action.passengers, state)
  ),
  on(PassengerActions.updatePassenger,
    (state, action) => adapter.updateOne(action.passenger, state)
  ),
  on(PassengerActions.updatePassengers,
    (state, action) => adapter.updateMany(action.passengers, state)
  ),
  on(PassengerActions.deletePassenger,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PassengerActions.deletePassengers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PassengerActions.loadPassengers,
    (state, action) => adapter.addAll(action.passengers, state)
  ),
  on(PassengerActions.clearPassengers,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: PassengerState | undefined, action: Action) {
  return passengerReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// Selector pointing to passenger state in store
const base = (s:PassengerAppState) => s.passenger;

// Selector pointing to all passenger entities
export const selectAllPassengers = createSelector(base, selectAll);