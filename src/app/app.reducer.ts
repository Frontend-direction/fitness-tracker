import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as FromAuth from './auth/auth.reducer';


export interface State {
  ui: fromUi.State,
  auth: FromAuth.State,
}

export const reducer: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: FromAuth.uiReducer,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsloading = createSelector(getUiState, fromUi.getIsloading);

export const getAuthState = createFeatureSelector<FromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, FromAuth.getIsAuth);
