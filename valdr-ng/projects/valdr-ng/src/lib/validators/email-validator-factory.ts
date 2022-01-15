import {BaseValidatorFactory} from './base-validator-factory';
import {BaseValidatorConfig, ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

/**
 * Handler for {@link Validators.email}.
 */
@Injectable()
export class EmailValidatorFactory extends BaseValidatorFactory {
  getConstraintName(): string {
    return 'email';
  }

  createValidator({message}: BaseValidatorConfig): ValdrValidationFn {
    return function(control: AbstractControl): ValidationErrors | null {
      if (Validators.email(control) !== null) {
        return {
          email: {
            message
          }
        };
      }
      return null;
    }
  }

}
