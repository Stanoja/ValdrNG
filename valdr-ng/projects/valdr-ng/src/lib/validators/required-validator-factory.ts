import {BaseValidatorFactory} from "./base-validator-factory";
import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";
import {ValdrValidationFn} from "../model";

/**
 * Handles {@link Validators.required}.
 */
export class RequiredValidatorFactory extends BaseValidatorFactory {

  canHandle(config: any): boolean {
    return !!config && !!config['required'];
  }

  createValidator(config: any): ValdrValidationFn[] {
    function required(control: AbstractControl): ValidationErrors | null {
      const result = Validators.required(control);
      if (result) {
        return {
          required: {
            message: config['required'].message
          }
        }
      }
      return result;
    }
    return [required];
  }
}
