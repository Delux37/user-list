import {ChangeDetectionStrategy, Component, HostListener, input, signal} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {COMMON_COMPONENT_PROVIDER_FACTORY} from "../common";

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    COMMON_COMPONENT_PROVIDER_FACTORY(NG_VALUE_ACCESSOR, AppInputComponent)
  ]
})
export class AppInputComponent implements ControlValueAccessor {
  public value = signal<unknown>(null);
  public isActive = signal(false);
  public isDisabled = signal(false);
  public placeholder = input('Placeholder');
  public onChange!: (value: unknown) => void;
  public onTouched!: () => void;

  @HostListener('input', ['$event'])
  public onInput(input: InputEvent) {
    const value = input.target ? (input.target as HTMLInputElement).value : '';
    this.onChange(value);
    this.value.set(value)
  }

  public onFocus(): void {
    this.isActive.set(true);
  }

  public onBlur(): void {
    this.isActive.set(false)
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
