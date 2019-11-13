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


export const debug = (reducer: ActionReducer<any>) => {
  
  return (state, action) => {
    console.debug('state', state);
    console.debug('action', action);
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
