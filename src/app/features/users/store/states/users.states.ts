import { User } from '../../models/users.model';
import { EntityState } from '@ngrx/entity';
import {IUserListPagination} from "../../models/user-list-pagination.model";

export interface UsersState extends EntityState<User> {
  addUserLoading: boolean;
  addUserLoaded: boolean;
  updateUserLoading: boolean;
  updateUserLoaded: boolean;
  deleteUserLoading: boolean;
  deleteUserLoaded: boolean;
  totalPage: number;
  currentUser: User | null;
  usersDataLoaded: boolean;
  usersDataLoading: boolean;
  page: IUserListPagination | null;
}
