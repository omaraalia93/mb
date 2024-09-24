import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
})
export class AllowNumberDirective implements OnInit {
  @Input() appNumberOnly: boolean = false;
  @Input() allowDecimal = true;
  @Input() preventFirstZero = true;

  numberInputInvalidChars = ['-', '+', 'e', 'E'];

  ngOnInit(): void {
    if (this.allowDecimal === false) {
      this.numberInputInvalidChars.push('.');
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    if (!this.appNumberOnly) return;
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    if (this.preventFirstZero && inputValue?.length === 0 && event.key === '0') {
      event.preventDefault();
    }

    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialKeys = [
      'Tab',
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];

    if (this.allowDecimal) {
      allowedKeys.push('.');
    }

    // Allow Ctrl+C (copy) and ....
    if (
      event.ctrlKey &&
      (
        event.key === 'a' ||
        event.key === 'A' ||
        event.key === 'c' ||
        event.key === 'C' ||
        event.key === 'v' ||
        event.key === 'V' ||
        event.key === 'x' ||
        event.key === 'X'
        )
    ) {
      return;
    }

    // Allow special keys
    if (specialKeys.includes(event.key)) {
      return;
    }

    // Allow numeric keys and decimal if allowed
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // @HostListener('paste', ['$event'])
  // onPaste(event: ClipboardEvent) {
  //     if (!this.appNumberOnly) return; // If appNumberOnly is false, do nothing
  
  //     const clipboardData = event.clipboardData || (window as any).clipboardData; // Fallback for older browsers
  //     const pastedText = clipboardData.getData('text');
  
  //     // Validate pasted text to allow only numeric characters and decimal if allowed
  //     const regex = this.allowDecimal ? /[^\d.]/g : /[^\d]/g;
  //     if (pastedText.match(regex)) {
  //         event.preventDefault();
  //     }
  // }

  @HostListener('wheel', ['$event'])
  onWheel(event: Event) {
    if (!this.appNumberOnly) return;
    event.preventDefault();
  }
}
