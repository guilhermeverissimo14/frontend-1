import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'condicional'
})
export class CondicionalPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Sim' : 'Não';
  }

}
