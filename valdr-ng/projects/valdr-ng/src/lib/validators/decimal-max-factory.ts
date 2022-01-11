import {ValidatorFn, Validators} from '@angular/forms';
import {DecimalFactory} from './base-decimal-factory';

/**
 * Handles {@link Validators.max} including exclusive case.
 */
export class DecimalMaxFactory extends DecimalFactory {

  getField(): string {
    return 'max';
  }

  getMainValidator(value: number): ValidatorFn {
    return Validators.max(value);
  }

  isExclusive(a: number, b: number): boolean {
    return a < b;
  }


}
