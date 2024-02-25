import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Injector,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { COMMON_COMPONENT_PROVIDER_FACTORY } from '../common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [
    COMMON_COMPONENT_PROVIDER_FACTORY(NG_VALUE_ACCESSOR, AppInputComponent),
  ],
})
export class AppInputComponent implements ControlValueAccessor, AfterViewInit {
  public submitted = input<boolean>(false);
  public value = signal<unknown>(null);
  public isActive = signal(false);
  public isDisabled = signal(false);
  public placeholder = input('Placeholder');
  public ngControl!: NgControl;
  public onChange!: (value: unknown) => void;
  public onTouched!: () => void;

  constructor(private injector: Injector) {}

  public ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  @HostListener('input', ['$event'])
  public onInput(input: InputEvent) {
    const value = input.target ? (input.target as HTMLInputElement).value : '';
    this.onChange(value);
    this.value.set(value);
  }

  public onFocus(): void {
    this.isActive.set(true);
  }

  public onBlur(): void {
    this.isActive.set(false);
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  public writeValue(value: (value: unknown) => void): void {
    this.value.set(value);
  }
}
