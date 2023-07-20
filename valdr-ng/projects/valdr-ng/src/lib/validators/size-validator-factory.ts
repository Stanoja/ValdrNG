import { BaseValidatorFactory } from './base-validator-factory';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import {
  SizeValidatorConfig,
  ValdrValidationErrors,
  ValdrValidatorFn,
} from '../model';
import { Injectable } from '@angular/core';

/**
 * Handles {@link Validators.minLength} and {@link Validators.maxLength} validation.
 */
@Injectable()
export class SizeValidatorFactory extends BaseValidatorFactory {
  getConstraintName(): string {
    return 'size';
  }

  createValidator(config: SizeValidatorConfig): ValdrValidatorFn {
    if (config.max === undefined) {
      return this.getMinLengthValidator(config);
    }
    return (control: AbstractControl): ValdrValidationErrors | null => {
      const minResult = this.getMinLengthValidator(config)(control);
      const maxResult = this.getMaxLengthValidator(config)(control);
      if (!minResult) {
        return maxResult;
      }
      if (!maxResult) {
        return minResult;
      }
      return {
        ...minResult,
        ...maxResult,
      };
    };
  }

  private getMinLengthValidator(config: SizeValidatorConfig) {
    return this.getValidatorFn(
      config.message,
      'minlength',
      Validators.minLength(config.min || 0)
    );
  }

  private getMaxLengthValidator(config: SizeValidatorConfig) {
    return this.getValidatorFn(
      config.message,
      'maxlength',
      Validators.maxLength(config.max as number)
    );
  }

  private getValidatorFn(
    message: string,
    messageField: string,
    validatorFn: ValidatorFn
  ): ValidatorFn {
    return function validator(
      control: AbstractControl
    ): ValdrValidationErrors | null {
      const result = validatorFn(control);
      if (result !== null && result[messageField]) {
        result[messageField]['message'] = message;
      }
      return result;
    };
  }
}
