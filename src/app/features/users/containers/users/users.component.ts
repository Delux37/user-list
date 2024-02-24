import {ChangeDetectionStrategy, Component, effect, signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUsersList, getUsersTotalPage, UsersState} from "../../store";
import * as userActions from '../../store/actions/users.actions'
import {PageEvent} from "@angular/material/paginator";
import {UserListFilterFormValueModel} from "../../models/user -list-filter-form.model";
import {IUserListPagination} from "../../models/user-list-pagination.model";
import {MatDialog} from "@angular/material/dialog";
import {AddEditUserDialogComponent} from "../../components";
import {User} from "../../models/users.model";

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public page = signal<IUserListPagination>({ pageSize: 10, pageIndex: 0 })
  public listFilters = signal<UserListFilterFormValueModel | {}>({ });
  public displayedColumns: string[] = ['image', 'identificationNumber', 'name', 'lastName', 'sex', 'mobileNumber', 'physicalAddress', 'actions'];
  public users$ = this.store.select(getUsersList)
  public totalPage$ = this.store.select(getUsersTotalPage)

  constructor(
    private store: Store<UsersState>,
    private dialog: MatDialog
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

  public onAddUser(): void {
    this.openDialog()
  }

  public onEdit(user: User): void {
    this.store.dispatch(userActions.updateCurrentUser({ user }));
    this.openDialog();
  }

  public onDelete(user: User): void {
    this.store.dispatch(userActions.deleteUser({ user }))
  }

  private openDialog(): void {
    this.dialog.open(
      AddEditUserDialogComponent,
      {
        width: '720px'
      }
    )
  }
}
