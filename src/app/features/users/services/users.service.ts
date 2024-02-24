import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {IUserList, User} from "../models/users.model";
import {UserListFilterFormValueModel} from "../models/user -list-filter-form.model";
import {IUserListPagination} from "../models/user-list-pagination.model";
import {HttpClient} from "@angular/common/http";
import {ApiUrls} from "../../../core/configuration/api-urls";

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private http: HttpClient
  ) { }
  public fetchUsers({ pid, mobileNumber, lastName }: UserListFilterFormValueModel, { pageSize, pageIndex }: IUserListPagination): Observable<IUserList> {
    return this.http.get<User[]>(
      ApiUrls.USERS_LIST
    )
    .pipe(
      map((users) => {

        const filteredList = users
          .reverse()
          .filter((user: User) => {
            return (
              (pid ? user.identificationNumber.toString().includes(pid) : true) &&
              (lastName ? user.lastName.toLowerCase().includes(lastName.toLowerCase()) : true) &&
              (mobileNumber ? user.mobileNumber.toString().includes(mobileNumber) : true)
            );
          })
          .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

        return {
          users: filteredList,
          totalCount: users.length
        }
      })
    )
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(
      ApiUrls.USERS_LIST,
      user
    )
  }

  public updateUser(user: User): Observable<User> {
    return this.http.patch<User>(
      `${ApiUrls.USERS_LIST}/${user.id}`,
      user
    )
  }

  public deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(
      `${ApiUrls.USERS_LIST}/${user.id}`
    )
  }
}
