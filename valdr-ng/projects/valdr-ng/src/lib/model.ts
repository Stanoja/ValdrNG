import {AbstractControl, ValidationErrors} from '@angular/forms';

export interface BaseValidator {
  message: string;
}

interface DecimalValidator extends BaseValidator{
  inclusive?: boolean;
  value: string | number;
}

interface DecimalMaxValidator {
  max: DecimalValidator;
}

interface DecimalMinValidator {
  min: DecimalValidator;
}

interface BaseLengthValidator {
  number: number;
}

interface MaxLengthValidator {
  maxLength: BaseValidator & BaseLengthValidator;
}

interface MinLengthValidator {
  minLength: BaseValidator & BaseLengthValidator;
}

interface EmailValidator {
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
