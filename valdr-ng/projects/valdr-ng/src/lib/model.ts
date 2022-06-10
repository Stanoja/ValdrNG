import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * Base validator config which includes the message field.
 */
export interface BaseValidatorConfig {
  message: string;
}

/**
 * Base validator.
 *
 * Example:
 * ```
 * interface MyValidatorConfig extends BaseValidatorConfig {
 *   value: string;
 * }
 *
 * interface MyValidator extends BaseValidator<MyValidatorConfig> {
 *   myValidator: MyValidatorConfig;
 * }
 * ```
 *
 * @param T type of {@link BaseValidatorConfig}
 */
export interface BaseValidator<T extends BaseValidatorConfig> {
  [key: string]: T;
}

export interface DecimalValidatorConfig extends BaseValidatorConfig {
  inclusive?: boolean;
  value: number;
}

export interface DecimalMaxValidator extends BaseValidator<DecimalValidatorConfig> {
  max: DecimalValidatorConfig;
}

export interface DecimalMinValidator extends BaseValidator<DecimalValidatorConfig> {
  min: DecimalValidatorConfig;
}

export interface BaseLengthValidatorConfig extends BaseValidatorConfig {
  number: number;
}

export interface MaxLengthValidator extends BaseValidator<BaseLengthValidatorConfig> {
  maxLength: BaseLengthValidatorConfig;
}

export interface MinLengthValidator extends BaseValidator<BaseLengthValidatorConfig> {
  minLength: BaseLengthValidatorConfig;
}

export interface EmailValidator extends BaseValidator<BaseValidatorConfig> {
  email: BaseValidatorConfig;
}

export interface PatternValidatorConfig extends BaseValidatorConfig {
  value: string | RegExp;
}

export interface PatternValidator extends BaseValidator<PatternValidatorConfig> {
  pattern: PatternValidatorConfig
}

export interface SizeValidatorConfig extends BaseValidatorConfig {
  min?: number;
  max?: number;
}

export interface SizeValidator extends BaseValidator<SizeValidatorConfig> {
  size: SizeValidatorConfig;
}

export interface UrlValidator extends BaseValidator<SizeValidatorConfig> {
  url: BaseValidatorConfig;
}

export interface RequiredValidator extends BaseValidator<BaseValidatorConfig> {
  required: BaseValidatorConfig;
}

/**
 * Valdr provided validator types
 */
export type BuiltInValidators = EmailValidator | PatternValidator | SizeValidator | RequiredValidator |
  DecimalMaxValidator | DecimalMinValidator | MaxLengthValidator | MinLengthValidator | UrlValidator |
  BaseValidator<BaseValidatorConfig>;

/**
 * Per model validation configuration.
 */
export type ValdrModelConstraints<DomainDto, C extends BaseValidatorConfig, T extends BaseValidator<C>> = {
  [field in keyof DomainDto]: T;
};

/**
 * Valdr configuration object, typically produced by parsing the constraints.json file from the backend.
 */
export interface ValdrConstraints {
  [type: string]: ValdrModelConstraints<ModelType, any, BuiltInValidators>;
}

/**
 * Error being produced by valdr validators.
 */
export type ValdrValidationErrors = ValidationErrors & { message?: string };

/**
 * The valdr generated angular forms validators.
 */
export type ValdrValidatorFn = (control: AbstractControl) => ValdrValidationErrors | null;

/**
 * Additional custom validators for a model. field refers to the field name in the model.
 */
export type CustomValidators<Type> = {[field in keyof Partial<Type>]: ValdrValidatorFn[] };

/**
 * Generic model type.
 */
export type ModelType = {[k: string]: any}
