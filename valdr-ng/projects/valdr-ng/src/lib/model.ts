import {AbstractControl, ValidationErrors} from '@angular/forms';

export interface BaseValidator {
  [validator: string]: {
    message: string;
  }
}

interface DecimalValidator {
  inclusive: boolean;
  value: string | number;
}

export interface DecimalMaxValidator {
  max: BaseValidator & DecimalValidator;
}

export interface DecimalMinValidator {
  min: BaseValidator & DecimalValidator;
}

interface BaseLengthValidator {
  number: number;
}

export interface MaxLengthValidator {
  maxLength: BaseValidator & BaseLengthValidator;
}

export interface MinLengthValidator {
  minLength: BaseValidator & BaseLengthValidator;
}

export interface EmailValidator {
  email: BaseValidator;
}

interface PatternValidator {
  pattern: BaseValidator & {
    value: string | RegExp;
  }
}

interface SizeValidator {
  size: BaseValidator & {
    min: number;
    max: number;
  }
}

interface UrlValidator {
  url: BaseValidator;
}

interface RequiredValidator {
  required: BaseValidator;
}

export interface ValdrModelConstraints {
  [field: string]: BaseValidator | EmailValidator | PatternValidator | SizeValidator | RequiredValidator |
    DecimalMaxValidator | DecimalMinValidator | MaxLengthValidator | MinLengthValidator | UrlValidator;
}

export interface ValdrConstraints {
  [model: string]: ValdrModelConstraints;
}

type ValdrValidationErrors = ValidationErrors & { message?: string };

export interface ValdrValidationFn {
  (control: AbstractControl): ValdrValidationErrors | null
}
