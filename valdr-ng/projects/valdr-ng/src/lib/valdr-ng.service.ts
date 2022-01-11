import {Injectable} from '@angular/core';
import {ValdrConstraints, ValdrValidationFn} from './model';
import {RequiredValidatorFactory} from './validators/required-validator-factory';
import {BaseValidatorFactory} from './validators/base-validator-factory';
import {SizeValidatorFactory} from './validators/size-validator-factory';
import {PatternValidatorFactory} from './validators/pattern-validator-factory';
import {EmailValidatorFactory} from './validators/email-validator-factory';
import {DecimalMaxFactory} from "./validators/decimal-max-factory";
import {DecimalMinFactory} from "./validators/decimal-min-factory";
import {MinLengthValidatorFactory} from './validators/min-length-validator-factory';
import {MaxLengthValidatorFactory} from './validators/max-length-validator-factory';
import {UrlValidatorFactory} from './validators/url-validator-factory';

/**
 * Main ValdrNG service.
 * It keeps all the existing validators and offers the possibility to register more.
 * <br>
 * Usage:
 * <ol>
 *   <li>Register constraints with {@link ValdrNgService.setConstraints}</li>
 *   <li>(Optional) Add custom validators with {@link ValdrNgService.addValidators}</li>
 *   <li>Create the form group controls with {@link ValdrNgService.createFormGroupControls}</li>
 * </ol>
 *
 * For example see valdr-ng-showcase app.
 */
@Injectable({
  providedIn: 'root'
})
export class ValdrNgService {

  private validators: BaseValidatorFactory[] = [new RequiredValidatorFactory(), new SizeValidatorFactory(),
    new PatternValidatorFactory(), new EmailValidatorFactory(), new DecimalMaxFactory(), new DecimalMinFactory(),
    new MaxLengthValidatorFactory(), new MinLengthValidatorFactory(), new UrlValidatorFactory()]
  private constraints: ValdrConstraints = {};

  /**
   * Sets the constraints to the service.
   *
   * @param constraints the constraints
   */
  setConstraints(constraints: ValdrConstraints) {
    this.constraints = constraints;
  }

  /**
   * Add additional valdr validator handlers which extend {@link BaseValidatorFactory}.
   *
   * @param valdrValidatorHandlers the valdr validators
   */
  addValidators(valdrValidatorHandlers: BaseValidatorFactory[]) {
    this.validators.push(...valdrValidatorHandlers);
  }

  /**
   * Create form group controls for the given model. The control and validators are taken from the constraints
   * ({@see setConstraints}).
   *
   * @param model the model
   * @param modelName the model name
   * @param additionalValidators additional validators per field
   */
  createFormGroupControls(model: any, modelName: string, additionalValidators?: {[key: string]: ValdrValidationFn[]}) {
    const modelConstraints = this.constraints[modelName];
    if (modelConstraints === undefined) {
      throw new Error(`No constraints provided for model ${modelName}.`);
    }
    const controls: any = {};
    Object.entries(modelConstraints).forEach(([field, value]) => {
      controls[field] = [model[field], [...this.getValidators(value)]];
    });
    if (additionalValidators) {
      Object.entries(additionalValidators).forEach(([field, validatorFns]) => {
        if (controls[field]) {
          controls[field][1] = [...controls[field[1]], ...validatorFns];
          return;
        }
        controls[field] = [model[field], validatorFns];
      });
    }
    return controls;
  }

  /**
   * Get validators for the field of the given model.
   *
   * @param modelName the model name
   * @param fieldName the field name
   * @return validators for the given field
   */
  public getValidatorsForField(modelName: string, fieldName: string): ValdrValidationFn[] {
    const modelConstraints = this.constraints[modelName];
    if (modelConstraints === undefined) {
      throw new Error(`No constraints provided for model ${modelName}.`);
    }
    const fieldConstraints = modelConstraints[fieldName];
    if (fieldConstraints === undefined) {
      throw new Error(`No constraints provided for ${modelName}.${fieldName}.`);
    }
    return this.getValidators(fieldConstraints);
  }

  private getValidators(validators: any) {
    return this.validators.filter(v => v.canHandle(validators))
      .flatMap(v => v.createValidator(validators))
      .filter(fv => fv !== undefined && fv !== null);
  }
}
