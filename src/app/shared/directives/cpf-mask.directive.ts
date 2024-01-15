import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cpfMask]'
})
export class CpfMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let cpf = event.target.value.replace(/\D/g, '');
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11);
    }
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.el.nativeElement.value = cpf;
    event.target.value = cpf;    
    event.stopPropagation();
  }

}
