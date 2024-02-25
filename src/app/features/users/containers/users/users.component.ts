import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {getCurrentPage, getUsersList, getUsersListLoading, getUsersTotalPage, UsersState} from '../../store';
import * as userActions from '../../store/actions/users.actions';
import { PageEvent } from '@angular/material/paginator';
import { UserListFilterFormValueModel } from '../../models/user -list-filter-form.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserDialogComponent } from '../../components';
import { User } from '../../models/users.model';
import { EventBusService } from '../../../../core/services/event-bus.service';
import { CONSTANTS } from '../../../../core/configuration/constants';
import { takeUntil, tap } from 'rxjs';
import { Destroyable } from '../../../../shared/class/destroyable.class';
import {toSignal} from "@angular/core/rxjs-interop";
import {IUserListPagination} from "../../models/user-list-pagination.model";

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent extends Destroyable implements OnInit {
  public listFilters = signal<
    UserListFilterFormValueModel | { [key: string]: unknown }
  >({});
  public displayedColumns: string[] = [
    'image',
    'identificationNumber',
    'name',
    'lastName',
    'sex',
    'mobileNumber',
    'physicalAddress',
    'actions',
  ];
  public users$ = this.store.select(getUsersList);
  public totalPage$ = this.store.select(getUsersTotalPage);
  public page$ = this.store.select(getCurrentPage);
  public loading$ = this.store.select(getUsersListLoading);
  private page = toSignal(this.page$);

  constructor(
    private store: Store<UsersState>,
    private dialog: MatDialog,
    private eventBus: EventBusService,
  ) {
    super();
    effect(
      () => {
        const filters = this.listFilters() as UserListFilterFormValueModel;
        const pagination = this.page() as IUserListPagination;

        this.store.dispatch(
          userActions.getUsers({
            filters,
            pagination,
          }),
        );
      },
      { allowSignalWrites: true },
    );
  }

  public ngOnInit(): void {
    this.eventBus
      .on(CONSTANTS.EVENT.DIALOGS.OPEN_USER_ADD_DIALOG)
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => this.openDialog()),
      )
      .subscribe();
  }

  public handlePageEvent({ pageSize, pageIndex }: PageEvent) {
    this.store.dispatch(userActions.updateCurrentPage({ page: {
        pageSize,
        pageIndex,
      } }))
  }

  public onRefreshList(): void {
    this.store.dispatch(
      userActions.getUsers({
        filters: this.listFilters() as UserListFilterFormValueModel,
        pagination: this.page() as IUserListPagination,
      }),
    );
  }

  public applyFilters(value: UserListFilterFormValueModel): void {
    this.listFilters.set(value);
  }

  public onAddUser(): void {
    this.openDialog();
  }

  public onEdit(user: User): void {
    this.store.dispatch(userActions.updateCurrentUser({ user }));
    this.openDialog();
  }

  public onDelete(user: User): void {
    this.store.dispatch(userActions.deleteUser({ user }));
  }

  private openDialog(): void {
    this.dialog.open(AddEditUserDialogComponent, {
      width: '720px',
    });
  }
}
