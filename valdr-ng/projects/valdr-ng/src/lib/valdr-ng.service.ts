import { Inject, Injectable } from '@angular/core';
import {
  CustomValidators,
  ModelType,
  ValdrConstraints,
  ValdrModelConstraints,
  ValdrValidationErrors,
  ValdrValidatorFn,
} from './model';
import { BaseValidatorFactory } from './validators/base-validator-factory';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';

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
  providedIn: 'root',
})
export class ValdrNgService {
  private constraints: ValdrConstraints = {};

  private validatorsPerField: { [key: string]: BaseValidatorFactory } = {};

  constructor(@Inject(BaseValidatorFactory) factories: BaseValidatorFactory[]) {
    factories.forEach(
      factory =>
        (this.validatorsPerField[factory.getConstraintName()] = factory)
    );
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
    validatorFactories.forEach(
      factory =>
        (this.validatorsPerField[factory.getConstraintName()] = factory)
    );
  }

  /**
   * Create form group controls for the given model. The control and validators are taken from the constraints
   * ({@see setConstraints}).
   *
   * @param model the model
   * @param typeName the type name
   * @param additionalValidators additional validators per field
   */
  createFormGroupControls<M extends Record<string, any>>(
    model: ModelType<M>,
    typeName: string,
    additionalValidators?: CustomValidators<M>
  ) {
    const typeConstraints = this.getTypeConstraints<M>(typeName);
    const controls: { [k in keyof M]?: [M[k]] | [M[k], ValidatorFn[]] } = {};
    for (const field in model) {
      controls[field] = [model[field]];
    }
    for (const field in typeConstraints) {
      controls[field] = [
        model[field],
        [...this.getValidators(typeConstraints[field])],
      ];
    }
    if (additionalValidators) {
      for (const field in additionalValidators) {
        if (controls[field]) {
          controls[field]![1] = [
            ...(controls[field]![1] ?? []),
            ...additionalValidators[field],
          ];
        } else {
          throw new Error(
            `No model value provided for custom validator on field '${field}'.`
          );
        }
      }
    }
    return controls;
  }

  /**
   * Adds validators to the given form group for the type name based on the constraints ({@see setConstraints}).
   *
   * @param formGroup the form group
   * @param typeName the type name
   */
  addValidators(formGroup: UntypedFormGroup, typeName: string): void {
    const typeConstraints = this.getTypeConstraints<any>(typeName);
    Object.entries(formGroup.controls).forEach(([controlName, control]) => {
      const fieldConstraints = typeConstraints[controlName];
      if (!fieldConstraints) {
        return;
      }
      const constraintValidators = this.getValidators(fieldConstraints);
      control.addValidators(constraintValidators);
    });
  }

  /**
   * Get validators for the field of the given type.
   *
   * @param typeName the model name
   * @param fieldName the field name
   * @return validators for the given field
   */
  public getValidatorsForField(
    typeName: string,
    fieldName: string
  ): ValdrValidatorFn[] {
    const typeConstraints = this.constraints[typeName];
    if (typeConstraints === undefined) {
      throw new Error(`No constraints provided for type '${typeName}'.`);
    }
    const fieldConstraints = typeConstraints[fieldName];
    if (fieldConstraints === undefined) {
      throw new Error(
        `No constraints provided for '${typeName}.${fieldName}'.`
      );
    }
    return this.getValidators(fieldConstraints);
  }

  /**
   * Directly validate value for a given type and field.
   *
   * @param typeName the model name
   * @param filedName the field name
   * @param value the value to validate
   * @return null or validation errors
   */
  public validate(
    typeName: string,
    filedName: string,
    value: any
  ): ValdrValidationErrors | null {
    const control = new UntypedFormControl(
      value,
      this.getValidatorsForField(typeName, filedName)
    );
    return control.errors;
  }

  private getValidators(fieldConstraints: any): ValdrValidatorFn[] {
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

  private getTypeConstraints<M>(
    typeName: string
  ): ValdrModelConstraints<M, any, any> {
    const typeConstraints = this.constraints[typeName];
    if (typeConstraints === undefined) {
      throw new Error(`No constraints provided for type '${typeName}'.`);
    }
    return typeConstraints as ValdrModelConstraints<M, any, any>;
  }
}
