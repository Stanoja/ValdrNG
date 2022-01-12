import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Base length validator factory.
 */
export abstract class BaseLengthValidatorFactory extends BaseValidatorFactory {

  createValidator({number, message}: any): ValdrValidationFn[] {
    const validatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (!this.getMainValidator(number)(control)) {
        return null;
      }
      return {
        [this.getConstraintName()]: {
          number,
          message
        }
      }
    };
    return [validatorFn];
  }

  /**
   * Gets the main validator for the provided length.
   *
   * @param length the length
   */
  abstract getMainValidator(length: number): ValidatorFn;
}
