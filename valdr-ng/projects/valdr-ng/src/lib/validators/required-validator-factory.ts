import { BaseValidatorFactory } from './base-validator-factory';
import { AbstractControl, Validators } from '@angular/forms';
import {
  BaseValidatorConfig,
  ValdrValidationErrors,
  ValdrValidatorFn,
} from '../model';
import { Injectable } from '@angular/core';

/**
 * Handles {@link Validators.required}.
 */
@Injectable()
export class RequiredValidatorFactory extends BaseValidatorFactory {
  getConstraintName(): string {
    return 'required';
  }

  createValidator({ message }: BaseValidatorConfig): ValdrValidatorFn {
    return function (control: AbstractControl): ValdrValidationErrors | null {
      const result = Validators.required(control);
      if (result === null) {
        return null;
      }
      return {
        required: {
          message,
        },
      };
    };
  }
}
