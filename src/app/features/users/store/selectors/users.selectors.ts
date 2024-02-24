import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UsersState} from "../states/users.states";
import {adapter} from "../reducers/users.reducers";

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getUsersList = createSelector(
  getUsersFeatureState,
  adapter.getSelectors().selectAll
)

export const getUsersTotalPage = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.totalPage
)

export const getCurrentUser = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.currentUser
)
