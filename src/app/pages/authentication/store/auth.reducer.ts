import { createReducer, on, Action } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/authentication/user.model';
import { AuthActions } from './auth-action-types';

export const featureKey = 'authApp';

export interface AuthState {
    user: UserModel;
    isLoading: boolean;
}

export const initialAuthState: AuthState = {
    user: null,
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
            user: null
        };
    }),

    on(AuthActions.getUser, (state, action) => {
        return {
            ...state,
            isLoading: true
        };
    }),

    on(AuthActions.saveUser, (state, action) => {
        return {
            ...state,
            user: action.user,
            isLoading: false
        };
    }),

);

export function reducer(state: AuthState | undefined, action: Action) {
    return lReducer(state, action);
}
