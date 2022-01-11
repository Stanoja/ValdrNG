import {BaseValidatorFactory} from './base-validator-factory';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ValdrValidationFn} from '../model';

/**
 * Handles {@link Validators.minLength} and {@link Validators.maxLength}.
 */
export class SizeValidatorFactory extends BaseValidatorFactory {

  canHandle(config: any): boolean {
    if (!config) {
      return false;
    }
    const sizeConfig = config['size'];
    return !!sizeConfig && (sizeConfig.min !== undefined || sizeConfig.max !== undefined);
  }

  createValidator(config: any): ValdrValidationFn[] {
    const sizeConfig = config['size'];
    const validators = [];
    validators.push(this.getMinLengthValidator(sizeConfig));
    if (sizeConfig.max !== undefined) {
      validators.push(this.getMaxLengthValidator(sizeConfig));
    }
    return validators;
  }

  private getMinLengthValidator(config: any) {
    return this.getValidatorFn(config.message, 'minlength', Validators.minLength(config.min || 0));
  }

  private getMaxLengthValidator(config: any) {
    return this.getValidatorFn(config.message, 'maxlength', Validators.maxLength(config.max));
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
