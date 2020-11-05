import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataNivelEscolar'
})
export class FormatarNivelEscolarPipe implements PipeTransform {

  transform(nivel: number): string {

    switch (nivel) {
      case 1:
        return 'Infantil';
      case 2:
        return 'Fundamental';
      case 3:
        return 'Ensino médio';
      default:
        return '';
    }
  }
}
