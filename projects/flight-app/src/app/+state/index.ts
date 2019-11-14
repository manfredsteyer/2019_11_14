import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


// Factory für Meta-Reducer
export const debug = (reducer: ActionReducer<any>) => {
  
  return (state, action) => {
    // Meta-Logik
    console.debug('state', state);
    console.debug('action', action);

    // Eigentliche Reducer
    const newState = reducer(state, action);

    // Meta-Logik
    console.debug('newState', state);
    return newState;
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
