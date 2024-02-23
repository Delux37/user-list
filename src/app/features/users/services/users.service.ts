import {Injectable} from "@angular/core";
import {delay, Observable, of} from "rxjs";
import {USERS_LIST_MOCK} from "../mocks/users-list.mock";
import {User} from "../models/users.model";

@Injectable({ providedIn: 'root' })
export class UsersService {
  public fetchUsers(): Observable<User[]> {
    return of(USERS_LIST_MOCK).pipe(
      delay(1000)
    )
  }
}
