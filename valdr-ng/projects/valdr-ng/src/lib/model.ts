import {AbstractControl, ValidationErrors} from '@angular/forms';

export interface BaseValidatorConfig {
  message: string;
}

export interface DecimalValidatorConfig extends BaseValidatorConfig {
  inclusive?: boolean;
  value: string | number;
}

export interface DecimalMaxValidator {
  max: DecimalValidatorConfig;
}

export interface DecimalMinValidator {
  min: DecimalValidatorConfig;
}

export interface BaseLengthValidatorConfig extends BaseValidatorConfig {
  number: number;
}

export interface MaxLengthValidator {
  maxLength: BaseLengthValidatorConfig;
}

export interface MinLengthValidator {
  minLength: BaseLengthValidatorConfig;
}

interface EmailValidator {
  email: BaseValidatorConfig;
}

export interface PatternValidatorConfig extends BaseValidatorConfig{
  value: string | RegExp;
}

interface PatternValidator {
  pattern: PatternValidatorConfig
}

export interface SizeValidatorConfig extends BaseValidatorConfig {
  min?: number;
  max?: number;
}

interface SizeValidator {
  size: SizeValidatorConfig;
}

interface UrlValidator {
  url: BaseValidatorConfig;
}

interface RequiredValidator {
  required: BaseValidatorConfig;
}

export interface ValdrModelConstraints {
  [field: string]: BaseValidatorConfig | EmailValidator | PatternValidator | SizeValidator | RequiredValidator |
    DecimalMaxValidator | DecimalMinValidator | MaxLengthValidator | MinLengthValidator | UrlValidator;
}

export interface ValdrConstraints {
  [model: string]: ValdrModelConstraints;
}

type ValdrValidationErrors = ValidationErrors & { message?: string };

export interface ValdrValidationFn {
  (control: AbstractControl): ValdrValidationErrors | null
}
