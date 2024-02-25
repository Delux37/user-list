import { createAction, props } from '@ngrx/store';
import { UsersActionsTypes } from './users.actions.types';
import { IUserList, User } from '../../models/users.model';
import { UserListFilterFormValueModel } from '../../models/user -list-filter-form.model';
import { IUserListPagination } from '../../models/user-list-pagination.model';

export const getUsers = createAction(
  UsersActionsTypes.GET_USERS,
  props<{
    filters: UserListFilterFormValueModel;
    pagination: IUserListPagination;
  }>(),
);
export const getUsersSuccess = createAction(
  UsersActionsTypes.GET_USERS_SUCCESS,
  props<{ users: IUserList }>(),
);
export const getUsersFail = createAction(UsersActionsTypes.GET_USERS_FAIL);

export const updateCurrentUser = createAction(
  UsersActionsTypes.UPDATE_CURRENT_USER,
  props<{ user: User | null }>(),
);

export const addUser = createAction(
  UsersActionsTypes.ADD_USER,
  props<{ user: User }>(),
);

export const addUserSuccess = createAction(
  UsersActionsTypes.ADD_USER_SUCCESS,
  props<{ user: User }>(),
);

export const addUserFail = createAction(UsersActionsTypes.ADD_USER_FAIL);

export const editUser = createAction(
  UsersActionsTypes.EDIT_USER,
  props<{ user: User }>(),
);

export const editUserSuccess = createAction(
  UsersActionsTypes.EDIT_USER_SUCCESS,
  props<{ user: User }>(),
);

export const editUserFail = createAction(UsersActionsTypes.EDIT_USER_FAIL);

export const deleteUser = createAction(
  UsersActionsTypes.DELETE_USER,
  props<{ user: User }>(),
);

export const deleteUserSuccess = createAction(
  UsersActionsTypes.DELETE_USER_SUCCESS,
  props<{ deletedUserId: number }>(),
);

export const deleteUserFail = createAction(UsersActionsTypes.DELETE_USER_FAIL);

export const refreshUserAddEdit = createAction(
  UsersActionsTypes.REFRESH_USER_EDD_EDIT,
);
