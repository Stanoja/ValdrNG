import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidationFn} from '../model';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export abstract class BaseLengthValidatorFactory extends BaseValidatorFactory {
  canHandle(config: any): boolean {
    return !!config && !!config['minLength'] && !!config['minLength'].number;
  }

  createValidator(config: any): ValdrValidationFn[] {
    const validatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (!this.getMainValidator(config[this.field].number)(control)) {
        return null;
      }
      return {
        minLength: {
          number: config[this.field].number,
          message: config[this.field].message
        }
      }
    };
    return [validatorFn];
  }

  /**
   * Gets the validation config field name.
   *
   * @return the field name
   */
  abstract get field(): string;


  /**
   * Gets the main validator for the provided length.
   *
   * @param length the length
   */
  abstract getMainValidator(length: number): ValidatorFn;
}
