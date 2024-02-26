import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../states/users.states';
import {
  addUser,
  addUserFail,
  addUserSuccess,
  deleteUser,
  deleteUserFail,
  deleteUserSuccess,
  editUser,
  editUserFail,
  editUserSuccess,
  getUsers,
  getUsersFail,
  getUsersSuccess,
  refreshUserAddEdit, updateCurrentPage,
  updateCurrentUser,
} from '../actions/users.actions';
import { User } from '../../models/users.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {IUserListPagination} from "../../models/user-list-pagination.model";

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
  page: { pageSize: 10, pageIndex: 0 }
});

export const usersReducers = createReducer<UsersState>(
  initialState,

  on(getUsers, (state) => {
    return adapter.setAll([], {
      ...state,
      usersDataLoaded: false,
      usersDataLoading: true,
    });
  }),

  on(getUsersSuccess, (state, { users }) => {
    return adapter.setAll(users.users, {
      ...state,
      usersDataLoaded: true,
      usersDataLoading: false,
      totalPage: users.totalCount,
    });
  }),

  on(getUsersFail, (state) => {
    return adapter.setAll([], {
      ...state,
      usersDataLoaded: false,
      usersDataLoading: false,
    });
  }),

  on(addUser, (state) => ({
    ...state,
    addUserLoaded: false,
    addUserLoading: true,
  })),

  on(addUserSuccess, (state, { user }) => {
    const hasNextPage = (pageSize: number, pageIndex: number, totalItems: number) => {
      const totalPages = Math.ceil(totalItems / pageSize);

      return pageIndex < totalPages - 1;
    }

    let entities = adapter.getSelectors().selectAll(state)

    if(state.page) {
      console.log(
        hasNextPage(
          state.page.pageSize, state.page.pageIndex, state.totalPage)
      )
    }

    if(state.page && hasNextPage(state.page.pageSize, state.page.pageIndex, state.totalPage)) {
      entities = entities.slice(0, -1);
    }

    return adapter.setAll([user, ...entities],
      {
        ...state,
        totalPage: state.totalPage + 1,
        addUserLoaded: true,
        addUserLoading: false,
      },
    )
  }),

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
      state,
    ),
    updateUserLoading: false,
    updateUserLoaded: true,
  })),

  on(editUserFail, (state) => ({
    ...state,
    updateUserLoading: false,
    updateUserLoaded: false,
  })),

  on(updateCurrentUser, (state: UsersState, { user }) => ({
    ...state,
    currentUser: user,
  })),

  on(deleteUser, (state) => ({
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

  on(refreshUserAddEdit, (state) => ({
    ...state,
    addUserLoaded: false,
    updateUserLoaded: false,
  })),

  on(updateCurrentPage, (state, { page }) => ({
    ...state,
    page
  }))
);
