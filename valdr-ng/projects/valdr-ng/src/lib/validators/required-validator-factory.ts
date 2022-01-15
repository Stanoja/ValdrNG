import {BaseValidatorFactory} from './base-validator-factory';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {BaseValidatorConfig, ValdrValidationFn} from '../model';
import {Injectable} from '@angular/core';

/**
 * Handles {@link Validators.required}.
 */
@Injectable()
export class RequiredValidatorFactory extends BaseValidatorFactory {
  getConstraintName(): string {
    return 'required';
  }

  createValidator({message}: BaseValidatorConfig): ValdrValidationFn {
    return function(control: AbstractControl): ValidationErrors | null {
      const result = Validators.required(control);
      if (result === null) {
        return null;
      }
      return {
        required: {
          message
        }
      }
    }
  }
}
