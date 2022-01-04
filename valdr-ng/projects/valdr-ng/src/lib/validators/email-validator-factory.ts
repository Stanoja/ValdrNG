import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

/**
 * Handler for {@link Validators.email}.
 */
export class EmailValidatorFactory extends BaseValidatorFactory {
  canHandle(config: any): boolean {
    return !!config && !!config['email'] && !!config['email']['message'];
  }

  createValidator(config: any): ValdrValidationFn[] {
    function validatorFn(control: AbstractControl): ValidationErrors | null {
      if (Validators.email(control) !== null) {
        return {
          email: {
            message: config['email']['message']
          }
        };
      }
      return null;
    }
    return [validatorFn];
  }

}
