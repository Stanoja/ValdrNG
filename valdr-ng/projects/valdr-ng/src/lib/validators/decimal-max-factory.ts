import {ValidatorFn, Validators} from '@angular/forms';
import {DecimalFactory} from './base-decimal-factory';
import {Injectable} from '@angular/core';

/**
 * Handles {@link Validators.max} including exclusive case.
 */
@Injectable()
export class DecimalMaxFactory extends DecimalFactory {

  getConstraintName(): string {
    return 'max';
  }

  getMainValidator(value: number): ValidatorFn {
    return Validators.max(value);
  }

  isExclusive(a: number, b: number): boolean {
    return a < b;
  }


}
