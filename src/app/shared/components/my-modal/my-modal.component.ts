import { Component,Renderer2 } from '@angular/core';
import { BaseModalComponent } from '@app-shared/index';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss'],
})
export class MyModalComponent extends BaseModalComponent {
  constructor(private renderer: Renderer2){
    super();
  }

  ngOnInit(): void {
    this.renderer.addClass(document.documentElement, 'modal-open');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.documentElement, 'modal-open');
  }

}
