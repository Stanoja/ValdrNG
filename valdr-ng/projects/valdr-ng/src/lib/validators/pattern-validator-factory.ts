import {BaseValidatorFactory} from './base-validator-factory';
import {PatternValidatorConfig, ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

/**
 * Handles {@link Validators.pattern}.
 */
@Injectable()
export class PatternValidatorFactory extends BaseValidatorFactory {
  getConstraintName(): string {
    return 'pattern';
  }

  createValidator(config: PatternValidatorConfig): ValdrValidationFn[] {
    function validatorFn(control: AbstractControl): ValidationErrors | null {
      const result = Validators.pattern(config.value)(control);
      if (result === null) {
        return null;
      }
      result['pattern'].message = config.message;
      return result;
    }

    return [validatorFn];
  }

}
