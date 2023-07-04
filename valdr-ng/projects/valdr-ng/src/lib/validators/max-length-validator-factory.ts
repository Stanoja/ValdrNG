import { ValidatorFn, Validators } from '@angular/forms';
import { BaseLengthValidatorFactory } from './base-length-validator-factory';
import { Injectable } from '@angular/core';

/**
 * Handles {@link Validators.maxLength}.
 */
@Injectable()
export class MaxLengthValidatorFactory extends BaseLengthValidatorFactory {
  getConstraintName(): string {
    return 'maxLength';
  }

  getMainValidator(length: number): ValidatorFn {
    return Validators.maxLength(length);
  }
}
