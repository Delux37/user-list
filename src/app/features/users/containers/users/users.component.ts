import {ChangeDetectionStrategy, Component, effect, signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUsersList, UsersState} from "../../store";
import {map, tap} from "rxjs";
import * as userActions from '../../store/actions/users.actions'
import {PageEvent} from "@angular/material/paginator";
import {UserListFilterFormValueModel} from "../../models/user -list-filter-form.model";
import {IUserListPagination} from "../../models/user-list-pagination.model";

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public page = signal<IUserListPagination>({ pageSize: 10, pageIndex: 0 })
  public listFilters = signal<UserListFilterFormValueModel | {}>({ });
  public displayedColumns: string[] = ['image', 'identificationNumber', 'name', 'lastName', 'sex', 'mobileNumber', 'physicalAddress'];
  public users$ = this.store.select(getUsersList)

  constructor(
    private store: Store<UsersState>
  ) {
    effect(() => {
      const filters = this.listFilters() as UserListFilterFormValueModel;
      const pagination = this.page();

      this.store.dispatch(userActions.getUsers({
        filters,
        pagination
      }));
    }, { allowSignalWrites: true });
  }

  public handlePageEvent({ pageSize, pageIndex }: PageEvent) {
    this.page.set({
      pageSize,
      pageIndex
    })
  }

  public applyFilters(value: UserListFilterFormValueModel): void {
    this.listFilters.set(value);
  }
}
