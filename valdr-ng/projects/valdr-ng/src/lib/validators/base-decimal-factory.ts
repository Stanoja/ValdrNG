import { BaseValidatorFactory } from './base-validator-factory';
import {
  DecimalValidatorConfig,
  ValdrValidationErrors,
  ValdrValidatorFn,
} from '../model';
import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Handles decimal validation with exclusive case.
 */
export abstract class DecimalFactory extends BaseValidatorFactory {
  createValidator(config: DecimalValidatorConfig): ValdrValidatorFn {
    return (control: AbstractControl): ValdrValidationErrors | null => {
      if (!this.getMainValidator(config.value)(control)) {
        return null;
      }
      return this.getValidationErrors(config);
    };
  }

  /**
   * Gets the main validator for the given value.
   *
   * @param value the number limit
   */
  abstract getMainValidator(value: number): ValidatorFn;

  private getValidationErrors({ value, message }: any) {
    return {
      [this.getConstraintName()]: {
        value,
        message,
      },
    };
  }
}
