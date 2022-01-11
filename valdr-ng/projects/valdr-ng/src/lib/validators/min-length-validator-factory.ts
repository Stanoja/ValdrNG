import {ValidatorFn, Validators} from '@angular/forms';
import {BaseLengthValidatorFactory} from './base-length-validator-factory';

/**
 * Handles {@link Validators.minLength}.
 */
export class MinLengthValidatorFactory extends BaseLengthValidatorFactory {

  get field(): string {
    return 'minLength';
  }

  getMainValidator(length: number): ValidatorFn {
    return Validators.minLength(length);
  }

}
