import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Injector,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { COMMON_COMPONENT_PROVIDER_FACTORY } from '../common';

@Component({
  selector: 'app-radio',
  templateUrl: './app-radio.component.html',
  styleUrls: ['./app-radio.component.scss'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    COMMON_COMPONENT_PROVIDER_FACTORY(NG_VALUE_ACCESSOR, AppRadioComponent),
  ],
})
export class AppRadioComponent implements ControlValueAccessor, AfterViewInit {
  public value = input<string | boolean | number | null>(null);
  public selectedValue = input<string | boolean | number | null>(null);
  public label = input('');
  public submitted = input<boolean>(false);
  public ngControl!: NgControl;
  public onChange!: (value: unknown) => void;
  public onTouched!: () => void;

  @HostListener('click')
  public onClick(): void {
    this.onSelect();
  }

  constructor(private injector: Injector) {}

  public ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue() {}

  public onSelect(): void {
    if (this.selectedValue() === this.value()) {
      return;
    }

    this.onChange(this.value());
  }

  private get control(): FormControl {
    return this.injector.get(NgControl).control as FormControl;
  }
}
