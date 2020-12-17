import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/authentication/user.model';

export enum ActionTypes {
    Login = '[Login Page] User Login',
    GetUser = '[On Success Login Or App Load] Get User',
    SaveUser = '[On Get User Success] Save User To Store',
    Logout = '[Navbar Dropdown Menu] User Logout',
    DeleteUser = '[After User Logout] Delete User And Redirect To Login'
}

export const getUser = createAction(
    ActionTypes.GetUser
);

export const saveUser = createAction(
    ActionTypes.SaveUser,
    props<{ user: UserModel }>()
);

export const login = createAction(
    ActionTypes.Login,
    props<{ user: any }>()
);

export const logout = createAction(
    ActionTypes.Logout,
);

export const deleteUser = createAction(
    ActionTypes.DeleteUser,
);
