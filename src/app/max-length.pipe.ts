import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value.length > args) {
      return value.substring(0, args-3) + "..."
    }
    else {
      return value;
    }
  }

}
