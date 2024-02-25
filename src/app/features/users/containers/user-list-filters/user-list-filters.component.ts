import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  UserListFilterFormModel,
  UserListFilterFormValueModel,
} from '../../models/user -list-filter-form.model';

@Component({
  selector: 'app-user-list-filters',
  templateUrl: './user-list-filters.component.html',
  styleUrls: ['./user-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListFiltersComponent implements OnInit {
  public form!: FormGroup<UserListFilterFormModel>;
  @Output() emitSubmitSearch = new EventEmitter<UserListFilterFormValueModel>();
  @Output() refreshEmit = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      pid: this.fb.nonNullable.control(''),
      lastName: this.fb.nonNullable.control(''),
      mobileNumber: this.fb.nonNullable.control(''),
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.emitSubmitSearch.emit(this.form.value as UserListFilterFormValueModel);
  }

  public submitSearch(): void {
    this.emitSubmitSearch.emit(this.form.value as UserListFilterFormValueModel);
  }

  public onRefresh(): void {
    this.refreshEmit.emit();
  }
}
