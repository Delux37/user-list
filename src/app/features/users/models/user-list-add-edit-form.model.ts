import { FormControl, FormGroup } from '@angular/forms';

export interface IUserListAddEditFormModel {
  name: FormControl<string>;
  lastName: FormControl<string>;
  sex: FormControl<string | null>;
  identificationNumber: FormControl<number | null>;
  mobileNumber: FormControl<number | null>;
  physicalAddress: FormGroup<IAddressFormGroup>;
  image: FormControl<string>;
}

export interface IAddressFormGroup {
  country: FormControl<string>;
  city: FormControl<string>;
  streetAdress: FormControl<string>;
}
