import {ValdrValidationFn} from '../model';

/**
 * Base validator factory. Used to create validator for the given config and checks whether the validator created
 * can work with the given configuration.
 */
export abstract class BaseValidatorFactory {

  /**
   * Returns the field which the current validator factory can handle.
   *
   * @return can handle the given config
   */
  abstract getConstraintName(): string;

  /**
   * Factory method to create a validator for the given config, if the validator can handle it {@see canHandle}.
   *
   * @param config: any
   * @return valdr validation functions
   */
  abstract createValidator(config: any): ValdrValidationFn[];
}
