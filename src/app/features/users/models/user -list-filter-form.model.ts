import { FormControl } from '@angular/forms';

export interface UserListFilterFormModel {
  pid: FormControl<string>;
  lastName: FormControl<string>;
  mobileNumber: FormControl<string>;
}

export interface UserListFilterFormValueModel {
  pid: string;
  lastName: string;
  mobileNumber: string;
}
