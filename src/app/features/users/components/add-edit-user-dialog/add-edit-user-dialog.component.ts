import {ChangeDetectionStrategy, Component} from "@angular/core";
import { MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IAddressFormGroup, IUserListAddEditFormModel} from "../../models/user-list-add-edit-form.model";
import {User} from "../../models/users.model";
import {Store} from "@ngrx/store";
import {getCurrentUser, UsersState} from "../../store";
import {tap} from "rxjs";
import * as userActions from '../../store/actions/users.actions';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditUserDialogComponent {
  public form!: FormGroup<IUserListAddEditFormModel>;
  public currentUser$ = this.store.select(
    getCurrentUser
  ).pipe(
    tap((currentUser) => this.selectCurrentUser(currentUser))
  )

  constructor(
    public dialogRef: MatDialogRef<HTMLElement>,
    private fb: FormBuilder,
    private store: Store<UsersState>,
  ) {
    this.dialogRef.keydownEvents().subscribe(({ key }) => {
      if (key === 'Escape') {
        this.onClose();
      }
    });

    this.dialogRef.backdropClick().subscribe(this.onClose.bind(this));

    this.buildForm();
  }

  public onClose(): void {
    this.dialogRef.close();
    this.store.dispatch(userActions.updateCurrentUser({ user: null }))
  }

  public onSave(isEditing: boolean, editingUserId: number | undefined): void {
    if(this.form.valid) {
      const user = this.form.value as User;

      if(isEditing) {
        this.store.dispatch(
          userActions.editUser({ user: {
              ...user,
              id: editingUserId
            } })
        )
        return;
      }

      this.store.dispatch(
        userActions.addUser({ user })
      );
    }
  }

  private buildForm(): void {
   this.form = this.fb.group<IUserListAddEditFormModel>({
     name: this.fb.nonNullable.control(''),
     lastName: this.fb.nonNullable.control(''),
     sex: this.fb.control(''),
     identificationNumber: this.fb.control(null),
     mobileNumber: this.fb.control(null),
     physicalAddress: this.fb.group<IAddressFormGroup>({
       country: this.fb.nonNullable.control(''),
       city: this.fb.nonNullable.control(''),
       streetAdress: this.fb.nonNullable.control(''),
     }),
     image: this.fb.nonNullable.control('https://placekitten.com/451/791')
   })
  }

  private selectCurrentUser(user: User | null): void {
    if(user) {
      this.form.patchValue(user)
    }
  }

  public get secControlValue(): string {
    return this.form.get('sex')?.value as string
  }
}
