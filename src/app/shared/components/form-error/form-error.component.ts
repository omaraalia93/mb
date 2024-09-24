import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null;
  @Input() form: FormGroup | null;
  @Input() colorClass: string;

  ngOnInit() {
    if(!this.form) return;
    this.form.valueChanges.subscribe((red) => {
    })
  }


}
