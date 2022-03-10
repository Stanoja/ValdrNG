import {Inject, Injectable} from '@angular/core';
import {ValdrConstraints, ValdrValidationFn} from './model';
import {BaseValidatorFactory} from './validators/base-validator-factory';
import {FormGroup} from '@angular/forms';

/**
 * Main ValdrNG service.
 * It keeps all the existing validators and offers the possibility to register more.
 * <br>
 * Usage:
 * <ol>
 *   <li>Register constraints with {@link ValdrNgService.setConstraints}</li>
 *   <li>(Optional) Add custom validators with {@link ValdrNgService.addValidatorFactories}</li>
 *   <li>Create the form group controls with {@link ValdrNgService.createFormGroupControls}</li>
 * </ol>
 *
 * For example see valdr-ng-showcase app.
 */
@Injectable({
  providedIn: 'root'
})
export class ValdrNgService {

  private constraints: ValdrConstraints = {};

  private validatorsPerField: {[key: string]: BaseValidatorFactory} = {};

  constructor(@Inject(BaseValidatorFactory) factories: BaseValidatorFactory[]) {
    factories.forEach(factory => this.validatorsPerField[factory.getConstraintName()] = factory);
  }

  /**
   * Sets the constraints to the service.
   *
   * @param constraints the constraints
   */
  setConstraints(constraints: ValdrConstraints) {
    this.constraints = constraints;
  }

  /**
   * Add additional valdr validator factories which extend {@link BaseValidatorFactory}.
   *
   * @param validatorFactories the valdr validator factories
   */
  addValidatorFactories(validatorFactories: BaseValidatorFactory[]) {
    validatorFactories.forEach(factory => this.validatorsPerField[factory.getConstraintName()] = factory);
  }

  /**
   * Create form group controls for the given model. The control and validators are taken from the constraints
   * ({@see setConstraints}).
   *
   * @param model the model
   * @param typeName the type name
   * @param additionalValidators additional validators per field
   */
  createFormGroupControls(model: any, typeName: string, additionalValidators?: {[key: string]: ValdrValidationFn[]}) {
    const typeConstraints = this.getTypeConstraints(typeName);
    const controls: any = {};
    Object.entries(model).forEach(([field]) => {
      controls[field] = [model[field]];
    })
    Object.entries(typeConstraints).forEach(([field, value]) => {
      controls[field] = [model[field], [...this.getValidators(value)]];
    });
    if (additionalValidators) {
      Object.entries(additionalValidators).forEach(([field, validatorFns]) => {
        if (controls[field]) {
          controls[field][1] = [...(controls[field][1] || []), ...validatorFns];
          return;
        }
        controls[field] = [model[field], validatorFns];
      });
    }
    return controls;
  }

  /**
   * Adds validators to the given form group for the type name based on the constraints ({@see setConstraints}).
   *
   * @param formGroup the form group
   * @param typeName the type name
   */
  addValidators(formGroup: FormGroup, typeName: string): void {
    const typeConstraints = this.getTypeConstraints(typeName);
    Object.entries(formGroup.controls).forEach(([control, config]) => {
      const fieldConstraints = typeConstraints[control];
      if (!fieldConstraints) {
        return;
      }
      const constraintValidators = this.getValidators(fieldConstraints);
      config.addValidators(constraintValidators);
    });
  }

  /**
   * Get validators for the field of the given type.
   *
   * @param typeName the model name
   * @param fieldName the field name
   * @return validators for the given field
   */
  public getValidatorsForField(typeName: string, fieldName: string): ValdrValidationFn[] {
    const typeConstraints = this.constraints[typeName];
    if (typeConstraints === undefined) {
      throw new Error(`No constraints provided for type '${typeName}'.`);
    }
    const fieldConstraints = typeConstraints[fieldName];
    if (fieldConstraints === undefined) {
      throw new Error(`No constraints provided for '${typeName}.${fieldName}'.`);
    }
    return this.getValidators(fieldConstraints);
  }

  private getValidators(fieldConstraints: any): ValdrValidationFn[] {
    return Object.entries(fieldConstraints)
      .filter(([k]) => {
        if (this.validatorsPerField[k]) {
          return true;
        }
        console.warn(`No validator found for constraint '${k}'.`);
        return false;
      })
      .map(([k, v]) => this.validatorsPerField[k].createValidator(v));
  }

  private getTypeConstraints(typeName: string) {
    const typeConstraints = this.constraints[typeName];
    if (typeConstraints === undefined) {
      throw new Error(`No constraints provided for type '${typeName}'.`);
    }
    return typeConstraints;
  }
}
