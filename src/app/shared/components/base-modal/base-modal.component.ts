import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitModal: EventEmitter<any> = new EventEmitter<any>();
  @Input('submitBtnName') submitBtnName: string;
  @Input('subTitle') subTitle: string;
  @Input('closeBtnName') closeBtnName: string;
  @Input('size') size: string;
  @Input('closeOutside') closeOutside: boolean;
  @Input('formGrow') formGrow: boolean;

  onSubmit() { this.submitModal.emit(); }
  onClose() { this.closeModal.emit(); }
  
  @HostListener('click', ['$event.target'])
  onClick(target) {
    if (target.classList.contains('modal-overlay')) {
      if(this.closeOutside){
        this.onClose();
      }
    }
  }
}
