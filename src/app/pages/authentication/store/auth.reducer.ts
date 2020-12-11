import { createReducer, on, Action } from '@ngrx/store';
import { AuthActions } from './auth-action-types';

export const featureKey = 'authApp';

export interface AuthState {
    user: any;
    isLoading: boolean;
}

export const initialAuthState: AuthState = {
    user: undefined,
    isLoading: false
};

export const lReducer = createReducer(

    initialAuthState,

    on(AuthActions.login, (state, action) => {
        return {
            ...state,
            user: action.user
        };
    }),

    on(AuthActions.logout, (state, action) => {
        return {
            ...state,
            user: undefined
        };
    }),

);

export function reducer(state: AuthState | undefined, action: Action) {
    return lReducer(state, action);
}
