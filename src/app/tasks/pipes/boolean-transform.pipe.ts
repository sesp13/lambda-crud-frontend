import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTransform',
})
export class BooleanTransformPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Si' : 'No';
  }
}
