import {Injectable} from "@angular/core";
import * as usersActions from '../actions/users.actions';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsersService} from "../../services/users.service";
import {catchError, exhaustMap, map, mergeMap, of, switchMap} from "rxjs";

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
}
