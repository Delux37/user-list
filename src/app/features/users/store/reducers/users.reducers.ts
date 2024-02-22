import {createReducer, on} from "@ngrx/store";
import {initialUserState, UsersState} from "../states/users.states";
import {getUsers, getUsersFail, getUsersSuccess} from "../actions/users.actions";

export const usersReducers = createReducer<UsersState>(
  initialUserState,

  on(getUsers, (state) => ({
    ...state,
    usersData: [],
    usersDataLoaded: false,
    usersDataLoading: true,
  })),

  on(getUsersSuccess, (state, { users}) => ({
    ...state,
    usersData: users,
    usersDataLoaded: true,
    usersDataLoading: false,
  })),

  on(getUsersFail, (state) => ({
    ...state,
    usersData: [],
    usersDataLoaded: false,
    usersDataLoading: false,
  })),
)
