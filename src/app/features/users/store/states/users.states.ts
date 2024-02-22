import {User} from "../../models/users.model";

export interface UsersState {
  addUserLoading: boolean;
  addUserLoaded: boolean;
  updateUserLoading: boolean;
  updateUserLoaded: boolean;
  deleteUserLoading: boolean;
  deleteUserLoaded: boolean;
  usersData: User[];
  usersDataLoaded: boolean;
  usersDataLoading: boolean;
}

export const initialUserState: UsersState = {
  addUserLoaded: false,
  addUserLoading: false,
  updateUserLoading: false,
  updateUserLoaded: false,
  deleteUserLoading: false,
  deleteUserLoaded: false,
  usersData: [],
  usersDataLoaded: false,
  usersDataLoading: false,
};
