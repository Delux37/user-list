import {createAction, props} from "@ngrx/store";
import {UsersActionsTypes} from "./users.actions.types";
import {User} from "../../models/users.model";
import {UserListFilterFormValueModel} from "../../models/user -list-filter-form.model";
import {IUserListPagination} from "../../models/user-list-pagination.model";

export const getUsers = createAction(
  UsersActionsTypes.GET_USERS,
  props<{ filters: UserListFilterFormValueModel, pagination: IUserListPagination }>()
);
export const getUsersSuccess = createAction(
  UsersActionsTypes.GET_USERS_SUCCESS,
  props<{users: User[]}>()
);
export const getUsersFail = createAction(UsersActionsTypes.GET_USERS_FAIL);
