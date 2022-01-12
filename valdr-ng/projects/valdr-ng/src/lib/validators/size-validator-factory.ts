import {BaseValidatorFactory} from './base-validator-factory';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {SizeValidatorConfig, ValdrValidationFn} from '../model';
import {Injectable} from '@angular/core';

/**
 * Handles {@link Validators.minLength} and {@link Validators.maxLength} validation.
 */
@Injectable()
export class SizeValidatorFactory extends BaseValidatorFactory {
  getConstraintName(): string {
    return 'size';
  }

  createValidator(config: SizeValidatorConfig): ValdrValidationFn[] {
    if (config.max !== undefined) {
      return [
        this.getMinLengthValidator(config),
        this.getMaxLengthValidator(config)
      ];
    }
    return [this.getMinLengthValidator(config)];
  }

  private getMinLengthValidator(config: SizeValidatorConfig) {
    return this.getValidatorFn(config.message, 'minlength', Validators.minLength(config.min || 0));
  }

  private getMaxLengthValidator(config: SizeValidatorConfig) {
    return this.getValidatorFn(config.message, 'maxlength', Validators.maxLength(config.max as number));
  }

  private getValidatorFn(message: string, messageField: string, validatorFn: ValidatorFn): ValidatorFn {
    return function validator(control: AbstractControl): ValidationErrors | null {
      const result = validatorFn(control);
      if (result !== null && result[messageField]) {
        result[messageField]['message'] = message;
      }
      return result;
    }
  }


}
