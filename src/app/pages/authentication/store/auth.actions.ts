import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
    Login = '[Login Page] User Login',
    Logout = '[Navbar Dropdown Menu] User Logout',
}

export const login = createAction(
    ActionTypes.Login,
    props<{ user: any }>()
);

export const logout = createAction(
    ActionTypes.Logout,
);
