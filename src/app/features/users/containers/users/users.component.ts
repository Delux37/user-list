import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUsersList, UsersState} from "../../store";

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public users$ = this.store.select(getUsersList)
  constructor(
    private store: Store<UsersState>
  ) { }
}
