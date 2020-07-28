import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[hasFocus]'
})
export class HasFocusDirective implements AfterViewInit, OnChanges {
  @Input("hasFocus") hasFocus: boolean;
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.hasFocus) {
        this.elementRef.nativeElement.focus();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      if (changes['hasFocus']?.currentValue === true) {
        this.elementRef.nativeElement.focus();
      }
    });
  }
}
