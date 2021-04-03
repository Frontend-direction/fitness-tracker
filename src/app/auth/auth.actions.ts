import { Action } from "@ngrx/store";

export const SET_AUTHENTACATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTACATED;
}

export class SetUnthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnthenticated;