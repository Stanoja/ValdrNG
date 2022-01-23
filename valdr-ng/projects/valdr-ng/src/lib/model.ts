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
  value: string | number;
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

interface EmailValidator extends BaseValidator<BaseValidatorConfig> {
  email: BaseValidatorConfig;
}

export interface PatternValidatorConfig extends BaseValidatorConfig {
  value: string | RegExp;
}

interface PatternValidator extends BaseValidator<PatternValidatorConfig> {
  pattern: PatternValidatorConfig
}

export interface SizeValidatorConfig extends BaseValidatorConfig {
  min?: number;
  max?: number;
}

interface SizeValidator extends BaseValidator<SizeValidatorConfig> {
  size: SizeValidatorConfig;
}

interface UrlValidator extends BaseValidator<SizeValidatorConfig> {
  url: BaseValidatorConfig;
}

interface RequiredValidator extends BaseValidator<BaseValidatorConfig> {
  required: BaseValidatorConfig;
}

export interface ValdrModelConstraints {
  [field: string]: BaseValidatorConfig | EmailValidator | PatternValidator | SizeValidator | RequiredValidator
    | DecimalMaxValidator | DecimalMinValidator | MaxLengthValidator | MinLengthValidator | UrlValidator
    | BaseValidator<BaseValidatorConfig>;
}

export interface ValdrConstraints {
  [model: string]: ValdrModelConstraints;
}

export type ValdrValidationErrors = ValidationErrors & { message?: string };

export interface ValdrValidationFn {
  (control: AbstractControl): ValdrValidationErrors | null
}
