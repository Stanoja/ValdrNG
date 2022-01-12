import {ValidatorFn, Validators} from '@angular/forms';
import {DecimalFactory} from './base-decimal-factory';
import {Injectable} from '@angular/core';

/**
 * Handles {@link Validators.min} including exclusive case.
 */
@Injectable()
export class DecimalMinFactory extends DecimalFactory {

  getConstraintName(): string {
    return 'min';
  }

  getMainValidator(value: number): ValidatorFn {
    return Validators.min(value);
  }

  isExclusive(a: number, b: number): boolean {
    return a > b;
  }
}
