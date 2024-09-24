import { Component, Input } from '@angular/core';
import { BaseModalComponent } from '@app-shared/index';
import { ActionModalState, ActionModalType } from '@app-core/index';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss'],
})
export class ActionModalComponent extends BaseModalComponent {
  @Input() type: string;
  @Input() title: string;
  @Input() desc: string;
  @Input() state: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._handleBtnNames();
  }

  private _handleBtnNames(): void {
    if (this.type === ActionModalType.confirm) {
      switch (this.state) {
        case ActionModalState.success:
        case ActionModalState.failed:
        case ActionModalState.warning:
        case ActionModalState.pending:
          // Use input values if provided, otherwise keep defaults
          if (!this.closeBtnName) {
            this.closeBtnName = 'general.close';
          }
          if (!this.submitBtnName) {
            this.submitBtnName = 'general.proceed';
          }
          break;
        case ActionModalState.delete:
          if (!this.closeBtnName) {
            this.closeBtnName = 'general.cancel';
          }
          if (!this.submitBtnName) {
            this.submitBtnName = 'general.delete';
          }
          break;
        case ActionModalState.reject:
          if (!this.closeBtnName) {
            this.closeBtnName = 'general.cancel';
          }
          if (!this.submitBtnName) {
            this.submitBtnName = 'general.reject';
          }
          break;
      }
      if (!this.closeBtnName) {
        this.closeBtnName = 'general.close';
      }
      if (!this.submitBtnName) {
        this.submitBtnName = 'general.proceed';
      }
    } else {
      // Use input value for submitBtnName if provided, otherwise set default
      if (!this.submitBtnName) {
        this.submitBtnName = 'general.ok';
      }
    }
  }
}
