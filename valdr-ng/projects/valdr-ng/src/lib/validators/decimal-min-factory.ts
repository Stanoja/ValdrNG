import {ValidatorFn, Validators} from '@angular/forms';
import {DecimalFactory} from './base-decimal-factory';

/**
 * Handles {@link Validators.min} including exclusive case.
 */
export class DecimalMinFactory extends DecimalFactory {

  getField(): string {
    return 'min';
  }

  getMainValidator(value: number): ValidatorFn {
    return Validators.min(value);
  }

  isExclusive(a: number, b: number): boolean {
    return a > b;
  }
}
