import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

/**
 * Handles {@link Validators.pattern}.
 */
export class PatternValidatorFactory extends BaseValidatorFactory {

  canHandle(config: any): boolean {
    return !!config && !!config['pattern'] && !!config['pattern'].value;
  }

  createValidator(config: any): ValdrValidationFn[] {
    function validatorFn(control: AbstractControl): ValidationErrors | null {
      const result = Validators.pattern(config['pattern'].value)(control);
      if (result === null) {
        return null;
      }
      result['pattern'].message = config['pattern'].message;
      return result;
    }

    return [validatorFn];
  }

}
