import { Directive, ElementRef, Renderer2, HostListener, Input,AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appActiveList]',
})
export class ActiveListDirective implements AfterViewInit {
  private _defaultActiveIndex = -1;
  @Input() activeClass = 'active';
  @Input() set appActiveList(index: number) {
    this._defaultActiveIndex = index;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const listItems = this.el.nativeElement.querySelectorAll('li');

    listItems.forEach((li: HTMLElement) => {
      this.renderer.removeClass(li, this.activeClass);
    });

    if (
      this._defaultActiveIndex >= 0 &&
      listItems?.length > this._defaultActiveIndex
    ) {
      this.renderer.addClass(
        listItems[this._defaultActiveIndex],
        this.activeClass
      );
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const listItems = this.el.nativeElement.querySelectorAll('li');

    listItems.forEach((li: HTMLElement) => {
      this.renderer.removeClass(li, this.activeClass);
    });

    if (event.target instanceof HTMLElement && event.target.tagName === 'LI') {
      this.renderer.addClass(event.target, this.activeClass);
    }
  }
}
