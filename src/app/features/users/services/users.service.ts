import {Injectable} from "@angular/core";
import {delay, Observable, of} from "rxjs";
import {USERS_LIST_MOCK} from "../mocks/users-list.mock";
import {User} from "../models/users.model";
import {UserListFilterFormValueModel} from "../models/user -list-filter-form.model";
import {IUserListPagination} from "../models/user-list-pagination.model";

@Injectable({ providedIn: 'root' })
export class UsersService {
  public fetchUsers({ pid, mobileNumber, lastName }: UserListFilterFormValueModel, { pageSize, pageIndex }: IUserListPagination): Observable<User[]> {
    const filteredList = USERS_LIST_MOCK
      .filter((user: User) => {
        return (
          (pid ? user.identificationNumber.toString().includes(pid) : true) &&
          (lastName ? user.lastName.toLowerCase().includes(lastName.toLowerCase()) : true) &&
          (mobileNumber ? user.mobileNumber.toString().includes(mobileNumber) : true)
        );
      })
      .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

    return of(filteredList).pipe(
      delay(1000)
    )
  }
}
