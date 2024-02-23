import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUsersList, UsersState} from "../../store";
import {map, tap} from "rxjs";
import * as userActions from '../../store/actions/users.actions'

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public displayedColumns: string[] = ['image', 'identificationNumber', 'name', 'lastName', 'sex', 'mobileNumber', 'physicalAddress'];
  public users$ = this.store.select(getUsersList)
    .pipe(
      tap((o) => console.log(o, 'ooo '))
    )
  constructor(
    private store: Store<UsersState>
  ) {
    this.store.dispatch(userActions.getUsers())
  }
}
