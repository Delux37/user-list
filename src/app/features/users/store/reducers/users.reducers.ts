import {createReducer, on} from "@ngrx/store";
import {UsersState} from "../states/users.states";
import {
  addUser, addUserFail,
  addUserSuccess, deleteUser, deleteUserFail, deleteUserSuccess, editUser, editUserFail, editUserSuccess,
  getUsers,
  getUsersFail,
  getUsersSuccess,
  updateCurrentUser
} from "../actions/users.actions";
import {User} from "../../models/users.model";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  addUserLoaded: false,
  addUserLoading: false,
  updateUserLoading: false,
  updateUserLoaded: false,
  deleteUserLoading: false,
  deleteUserLoaded: false,
  currentUser: null,
  totalPage: 0,
  usersDataLoaded: false,
  usersDataLoading: false,
})

export const usersReducers = createReducer<UsersState>(
  initialState,

  on(getUsers, (state) => {
    return adapter.setAll([], { ...state,usersDataLoaded: false, usersDataLoading: true })
  }),

  on(getUsersSuccess, (state, { users}) => {
    return adapter.setAll(users.users, { ...state,usersDataLoaded: true, usersDataLoading: false, totalPage: users.totalCount })
  }),

  on(getUsersFail, (state) => {
    return adapter.setAll([], { ...state,usersDataLoaded: false, usersDataLoading: false })
  }),

  on(addUser, (state, {user}) => ({
    ...state,
    addUserLoaded: false,
    addUserLoading: true,
  })),

  on(addUserSuccess, (state, { user }) => ({
    ...adapter.addOne(user, state),
    ...state,
    addUserLoaded: true,
    addUserLoading: false,
  })),

  on(addUserSuccess, (state, { user }) =>
    adapter.setAll([user, ...adapter.getSelectors().selectAll(state).slice(0, -1)], { ...state})
  ),

  on(addUserFail, (state) => ({
    ...state,
    addUserLoaded: false,
    addUserLoading: false,
  })),

  on(editUser, (state) => ({
    ...state,
    updateUserLoading: true,
    updateUserLoaded: false,
  })),

  on(editUserSuccess, (state, { user }) => ({
    ...adapter.updateOne(
      {
        id: (user.id as number).toString(),
        changes: user,
      },
      state
    ),
    updateUserLoading: false,
    updateUserLoaded: true,
  })),

  on(editUserFail, (state) => ({
    ...state,
    updateUserLoading: false,
    updateUserLoaded: false,
  })),


  on(updateCurrentUser, (state: UsersState, { user })=> ({
    ...state,
    currentUser: user
  })),

  on(deleteUser, (state, {user}) => ({
    ...state,
    deleteUserLoaded: false,
    deleteUserLoading: true,
  })),

  on(deleteUserSuccess, (state, { deletedUserId }) => ({
    ...adapter.removeOne(deletedUserId as number, state),
    totalPage: state.totalPage - 1,
    deleteUserLoaded: true,
    deleteUserLoading: false,
  })),

  on(deleteUserFail, (state) => ({
    ...state,
    deleteUserLoaded: false,
    deleteUserLoading: false,
  })),
)
