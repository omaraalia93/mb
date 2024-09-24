import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHideTooltip]'
})
export class HideTooltipDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const toolTips = document.querySelector(".tooltip");
    if(toolTips) this.renderer.removeClass(toolTips, 'show');
  }
}