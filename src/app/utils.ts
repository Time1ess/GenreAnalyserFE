import { ElementRef } from '@angular/core';

/* Resize element width and height when window size changed. */
export function resizeElement(elementRef: ElementRef) {
  const elem = elementRef.nativeElement;
  const computedStyles = getComputedStyle(elem);
  const targetWidth = computedStyles.width;
  const targetHeight = computedStyles.height;
  elem.width = targetWidth.substring(0, targetWidth.length - 2);
  elem.height = targetHeight.substring(0, targetHeight.length - 2);
}

