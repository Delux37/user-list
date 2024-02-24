import {Injectable} from "@angular/core";
import * as usersActions from '../actions/users.actions';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsersService} from "../../services/users.service";
import {catchError, map, of, switchMap} from "rxjs";
import {User} from "../../models/users.model";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUsers),
      switchMap(
        ({ filters, pagination }) => this.usersService.fetchUsers(
          filters,
          pagination
        ).pipe(
          catchError(() => {
            return of(null)
          }),
          map((users) => {
            if(users) {
              return usersActions.getUsersSuccess({ users })
            }
            return usersActions.getUsersFail
          })
        )
      )
    )
  )

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.addUser),
      switchMap(
        ({ user }) => this.usersService.addUser(
          user
        ).pipe(
          catchError(() => {
            return of(null)
          }),
          map((user) => {
            if(user) {
              return usersActions.addUserSuccess({ user })
            }
            return usersActions.addUserFail
          })
        )
      )
    )
  )

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.editUser),
      switchMap(
        ({ user }) => this.usersService.updateUser(
          user
        ).pipe(
          catchError(() => {
            return of(null)
          }),
          map((user) => {
            if(user) {
              return usersActions.editUserSuccess({ user })
            }
            return usersActions.editUserFail
          })
        )
      )
    )
  )

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUser),
      switchMap(
        ({ user }) => this.usersService.deleteUser(
          user
        ).pipe(
          catchError(() => {
            return of(null)
          }),
          map((user: User | null) => {
            if(user) {
              return usersActions.deleteUserSuccess({ deletedUserId: user.id as number })
            }
            return usersActions.deleteUserFail
          })
        )
      )
    )
  )
}
