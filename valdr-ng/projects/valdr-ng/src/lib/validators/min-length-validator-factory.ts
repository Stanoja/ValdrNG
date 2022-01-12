import {ValidatorFn, Validators} from '@angular/forms';
import {BaseLengthValidatorFactory} from './base-length-validator-factory';
import {Injectable} from '@angular/core';

/**
 * Handles {@link Validators.minLength}.
 */
@Injectable()
export class MinLengthValidatorFactory extends BaseLengthValidatorFactory {

  getConstraintName(): string {
    return 'minLength';
  }

  getMainValidator(length: number): ValidatorFn {
    return Validators.minLength(length);
  }

}
