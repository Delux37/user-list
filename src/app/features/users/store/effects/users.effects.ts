import { Injectable } from '@angular/core';
import * as usersActions from '../actions/users.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from '../../models/users.model';
import { SnackbarService } from '../../../ui/services/snackbar.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private snackBarService: SnackbarService,
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUsers),
      switchMap(({ filters, pagination }) =>
        this.usersService.fetchUsers(filters, pagination).pipe(
          catchError(() => {
            return of(null);
          }),
          map((users) => {
            if (users) {
              return usersActions.getUsersSuccess({ users });
            }
            this.snackBarService.openSnackbar('Get users fail', 'error');
            return usersActions.getUsersFail;
          }),
        ),
      ),
    ),
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.addUser),
      switchMap(({ user }) =>
        this.usersService.addUser(user).pipe(
          catchError(() => {
            return of(null);
          }),
          map((user) => {
            if (user) {
              this.snackBarService.openSnackbar(
                'User Added Successfully',
                'success',
              );
              return usersActions.addUserSuccess({ user });
            }
            this.snackBarService.openSnackbar('Failed to add user', 'error');
            return usersActions.addUserFail;
          }),
        ),
      ),
    ),
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.editUser),
      switchMap(({ user }) =>
        this.usersService.updateUser(user).pipe(
          catchError(() => {
            return of(null);
          }),
          map((user) => {
            if (user) {
              this.snackBarService.openSnackbar(
                'User edited successfully',
                'success',
              );
              return usersActions.editUserSuccess({ user });
            }
            this.snackBarService.openSnackbar('Failed to edit user', 'error');
            return usersActions.editUserFail;
          }),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUser),
      switchMap(({ user }) =>
        this.usersService.deleteUser(user).pipe(
          catchError(() => {
            return of(null);
          }),
          map((user: User | null) => {
            if (user) {
              this.snackBarService.openSnackbar(
                'User deleted successfully',
                'success',
              );
              return usersActions.deleteUserSuccess({
                deletedUserId: user.id as number,
              });
            }
            this.snackBarService.openSnackbar('Failed to delete user', 'error');
            return usersActions.deleteUserFail;
          }),
        ),
      ),
    ),
  );
}
