import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.featureKey);

export const isLoggedIn = createSelector(
    selectAuthState,
    (authState) => !!authState.user
);



export const user = createSelector(
    selectAuthState,
    (authState) => authState.user
);


export const katedryVRoliVyucujici = createSelector(
    user,
    (userModel) => {
        return [...new Set(userModel.stagUserInfo.filter(c => c.role === 'VY').map(c => c.katedra))];
    }
);

export const fakultaKatedra = createSelector(
    user,
    (userModel) => {
        return [userModel.activeStagUserInfo.fakulta + '/' + userModel.activeStagUserInfo.katedra];
    }
);


export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
);



// export const userCompaniesByName = (name) => createSelector(userCompanies, (companies) => {
//     if (!name) { return companies; }

//     return companies.filter(c => StringFilterModel.kmpSearch(name.toLowerCase(), c.name.toLowerCase()) !== -1);
// });


// export const isLoading = createSelector(
//     selectAuthState,
//     (authState) => authState.isLoading
// );


