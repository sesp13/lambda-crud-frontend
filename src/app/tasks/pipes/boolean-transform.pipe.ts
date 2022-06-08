import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTransform',
})
export class BooleanTransformPipe implements PipeTransform {
  transform(
    condition: boolean,
    trueValue?: string,
    falseValue?: string
  ): string {
    return condition
      ? trueValue === undefined
        ? 'Si'
        : trueValue
      : falseValue === undefined
      ? 'No'
      : falseValue;
  }
}
