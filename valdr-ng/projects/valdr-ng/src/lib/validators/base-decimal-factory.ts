import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Handles decimal validation with exclusive case.
 */
export abstract class DecimalFactory extends BaseValidatorFactory {

  canHandle(config: any): boolean {
    return !!config && !!config[this.getField()]
      && !!config[this.getField()]['value']
      && !!config[this.getField()]['message'];
  }

  createValidator(config: any): ValdrValidationFn[] {
    const validationFn = (control: AbstractControl): ValidationErrors | null => {
      if (!config[this.getField()].inclusive) {
        return this.handleExclusive(control, config);
      }
      return this.handleInclusive(config, control);
    }
    return [validationFn];
  }

  /**
   * Gets the validation config field name.
   *
   * @return the field name
   */
  abstract getField(): string;

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

  private handleExclusive(control: AbstractControl, config: any): ValidationErrors | null {
    if (!control.value || isNaN(control.value)) {
      return null;
    }
    if (this.isExclusive(Number(control.value), config[this.getField()]['value'])) {
      return null
    }
    return this.getValidationErrors(config);
  }

  private handleInclusive(config: any, control: AbstractControl) {
    if (!this.getMainValidator(config[this.getField()]['value'])(control)) {
      return null;
    }
    return this.getValidationErrors(config);
  }

  private getValidationErrors(config: any) {
    return {
      [this.getField()]: {
        value: config[this.getField()]['value'],
        message: config[this.getField()]['message']
      }
    };
  }
}
