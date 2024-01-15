import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cepMask]',
})
export class CepMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let cep = event.target.value.replace(/\D/g, '');
    if (cep.length > 8) {
      cep = cep.substring(0, 8);
    }
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    this.el.nativeElement.value = cep;
    event.target.value = cep;
    event.stopPropagation();
  }

}
