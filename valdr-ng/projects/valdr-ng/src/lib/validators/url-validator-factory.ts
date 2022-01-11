import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export class UrlValidatorFactory extends BaseValidatorFactory {
  private readonly urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?$/;

  canHandle(config: any): boolean {
    return !!config && !!config['url'];
  }

  createValidator(config: any): ValdrValidationFn[] {
    const validateFn = ({value}: AbstractControl): ValidationErrors | null => {
      if (value === null || value === '') {
        return null;
      }
      if (this.urlRegex.test(value)) {
        return null;
      }
      return {
        url: {
          message: config['url'].message
        }
      };
    }
    return [validateFn];
  }

}
