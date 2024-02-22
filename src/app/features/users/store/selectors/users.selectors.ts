import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UsersState} from "../states/users.states";

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getUsersList = createSelector(
  getUsersFeatureState,
  (state: UsersState) => state.usersData
)
