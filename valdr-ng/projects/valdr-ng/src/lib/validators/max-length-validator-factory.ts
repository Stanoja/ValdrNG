import {ValidatorFn, Validators} from '@angular/forms';
import {BaseLengthValidatorFactory} from './base-length-validator-factory';

/**
 * Handles {@link Validators.maxLength}.
 */
export class MaxLengthValidatorFactory extends BaseLengthValidatorFactory {

  get field(): string {
    return 'maxLength';
  }

  getMainValidator(length: number): ValidatorFn {
    return Validators.maxLength(length);
  }

}
