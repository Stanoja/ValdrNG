import {BaseValidatorFactory} from './base-validator-factory';
import {DecimalValidatorConfig, ValdrValidationErrors, ValdrValidatorFn} from '../model';
import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Handles decimal validation with exclusive case.
 */
export abstract class DecimalFactory extends BaseValidatorFactory {

  createValidator(config: DecimalValidatorConfig): ValdrValidatorFn {
    return (control: AbstractControl): ValdrValidationErrors | null => {
      if (config.inclusive) {
        return this.handleInclusive(config, control);
      }
      return this.handleExclusive(config, control);
    };
  }

  /**
   * Checks if the numbers are exclusive.
   *
   * @param a the control value
   * @param b the config value
   * @return true if exclusive
   */
  abstract isExclusive(a: number, b: number): boolean;

  /**
   * Gets the main validator for the given value.
   *
   * @param value the number limit
   */
  abstract getMainValidator(value: number): ValidatorFn;

  private handleExclusive(config: DecimalValidatorConfig, control: AbstractControl): ValdrValidationErrors | null {
    if (!control.value || isNaN(control.value)) {
      return null;
    }
    if (this.isExclusive(Number(control.value), config.value)) {
      return null
    }
    return this.getValidationErrors(config);
  }

  private handleInclusive(config: DecimalValidatorConfig, control: AbstractControl) {
    if (!this.getMainValidator(config.value)(control)) {
      return null;
    }
    return this.getValidationErrors(config);
  }

  private getValidationErrors({value, message}: any) {
    return {
      [this.getConstraintName()]: {
        value,
        message
      }
    };
  }
}
