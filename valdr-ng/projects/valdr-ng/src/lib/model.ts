import {AbstractControl, ValidationErrors} from "@angular/forms";

export interface BaseValidator {
    [validator: string]: {
        message: string;
    }
}

interface SizeValidator {
    size: BaseValidator & {
        min: number;
        max: number;
    }
}

interface RequiredValidator {
    required: BaseValidator;
}

export interface ValdrFieldConstraints {
    size?: SizeValidator;
}

export interface ValdrModelConstraints {
    [field: string]: ValdrModelConstraints | BaseValidator | SizeValidator | RequiredValidator;
}

export interface ValdrConstraints {
    [model: string]: ValdrModelConstraints;
}

type ValdrValidationErrors = ValidationErrors & { message?: string };

export interface ValdrValidationFn {
  (control: AbstractControl): ValdrValidationErrors | null
}
