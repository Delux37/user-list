import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '../states/users.states';
import { adapter } from '../reducers/users.reducers';

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getUsersList = createSelector(
  getUsersFeatureState,
  adapter.getSelectors().selectAll,
);

export const getUsersListLoading = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.usersDataLoading
);

export const getUsersTotalPage = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.totalPage,
);

export const getCurrentUser = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.currentUser,
);

export const getUserEditAdded = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.addUserLoaded || state.updateUserLoaded,
);

export const getCurrentPage = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.page
)
