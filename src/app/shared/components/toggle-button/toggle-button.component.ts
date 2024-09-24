import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
})
export class ToggleButtonComponent {
  @Output() isChecked:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input("checkedStatus") checkedStatus:boolean = false;
  @Input() classes = [];
  @Input() text:string;
  @Input() textDir:string;
  
  get divClasses(): string {
    return [...this.classes].join(" ");
  }
  
  checkChange(event:any):void {
    this.isChecked.emit(event.target.checked);
    this.checkedStatus = event.target.checked;
  }

}
