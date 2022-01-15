import {BaseValidatorFactory} from './base-validator-factory';
import {BaseValidatorConfig, ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';

/**
 * Handles URL validation.
 */
@Injectable()
export class UrlValidatorFactory extends BaseValidatorFactory {
  private readonly urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?$/;

  getConstraintName(): string {
    return 'url';
  }

  createValidator({message}: BaseValidatorConfig): ValdrValidationFn {
    return ({value}: AbstractControl): ValidationErrors | null => {
      if (value === null || value === '') {
        return null;
      }
      if (this.urlRegex.test(value)) {
        return null;
      }
      return {
        url: {
          message
        }
      };
    };
  }

}
