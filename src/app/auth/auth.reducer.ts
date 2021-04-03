import { Action } from "@ngrx/store";
import { AuthActions, SET_AUTHENTACATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};


export function uiReducer(state = initialState, action: AuthActions) {
  switch(action.type) {
    case SET_AUTHENTACATED:
      return {
        isAuthenticated: true,
      }
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated : false,
      }
    default: 
      return state;
  }
};

export const getIsAuth = (state: State) => state.isAuthenticated; 
