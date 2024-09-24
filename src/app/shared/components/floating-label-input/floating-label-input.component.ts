import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-floating-label-input',
  templateUrl: './floating-label-input.component.html',
  styleUrls: ['./floating-label-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingLabelInputComponent),
      multi: true
    }
  ]
})
export class FloatingLabelInputComponent implements ControlValueAccessor {
  @Input() type: string;
  @Input() textMaxLength: number = 100;
  @Input() formControlName: string;
  @Input() label: string;
  @Input() prepend: boolean;
  @Input() append: boolean;
  @Input() hasError: any;
  @Input() classes = [];
  @Input() placeholder: string = '';
  @Input() isDisabled: boolean = false;

  // directives
  @Input() appNumberOnly: boolean = false;
  @Input() allowDecimal: boolean;
  @Input() preventFirstZero: boolean = true;
  @Input() maxLengthBeforeDecimal: number = 1000000000000000;
  @Input() maxLengthAfterDecimal: number = 1000000000000000;
  @Input() isPlaceholder: boolean = false;
  
  isInputFocused: boolean;

  value: any = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  generatedId: string;
  autocomplete: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    let name = this.label.split('.').pop();
    name = name.replace(' ', '');
    this.generatedId = `input_type_${this.type}_name_${this.formControlName}_${name}`;
    this.autocomplete = this.type === 'password' ? 'new-password' : 'off';
  }
 

  get inputClasses(): string[] {
    return [...this.classes];
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  updateValue(event: any): void {
    if (event.value === null) return;
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onInputFocus(): void {
    if (this.isDisabled) return;
    this.isInputFocused = true;
  }

  onInputBlur(): void {
    this.isInputFocused = false;
  }

  updateInputValue(): void {
    this.onChange(this.value);
  }

  onkeyPrevent(event: any) {
    const keysToPrevent = [' ', 'ArrowUp', 'ArrowDown'];
    if (keysToPrevent.includes(event.key)) {
      event.stopPropagation();
    }
  }
}