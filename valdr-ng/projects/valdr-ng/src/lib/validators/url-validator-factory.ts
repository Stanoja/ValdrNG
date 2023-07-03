import { BaseValidatorFactory } from './base-validator-factory';
import {
  BaseValidatorConfig,
  ValdrValidationErrors,
  ValdrValidatorFn,
} from '../model';
import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

/**
 * Handles URL validation.
 */
@Injectable()
export class UrlValidatorFactory extends BaseValidatorFactory {
  private readonly urlRegex =
    /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?$/;

  getConstraintName(): string {
    return 'url';
  }

  createValidator({ message }: BaseValidatorConfig): ValdrValidatorFn {
    return ({ value }: AbstractControl): ValdrValidationErrors | null => {
      if (value === null || value === '') {
        return null;
      }
      if (this.urlRegex.test(value)) {
        return null;
      }
      return {
        url: {
          message,
        },
      };
    };
  }
}
