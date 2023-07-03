import { BaseValidatorFactory } from './base-validator-factory';
import {
  BaseLengthValidatorConfig,
  ValdrValidationErrors,
  ValdrValidatorFn,
} from '../model';
import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Base length validator factory.
 */
export abstract class BaseLengthValidatorFactory extends BaseValidatorFactory {
  createValidator({
    number,
    message,
  }: BaseLengthValidatorConfig): ValdrValidatorFn {
    return (control: AbstractControl): ValdrValidationErrors | null => {
      if (!this.getMainValidator(number)(control)) {
        return null;
      }
      return {
        [this.getConstraintName()]: {
          number,
          message,
        },
      };
    };
  }

  /**
   * Gets the main validator for the provided length.
   *
   * @param length the length
   */
  abstract getMainValidator(length: number): ValidatorFn;
}
