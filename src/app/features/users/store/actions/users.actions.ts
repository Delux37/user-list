import {createAction, props} from "@ngrx/store";
import {UsersActionsTypes} from "./users.actions.types";
import {User} from "../../models/users.model";

export const getUsers = createAction(UsersActionsTypes.GET_USERS);
export const getUsersSuccess = createAction(
  UsersActionsTypes.GET_USERS_SUCCESS,
  props<{users: User[]}>()
);
export const getUsersFail = createAction(UsersActionsTypes.GET_USERS_FAIL);
