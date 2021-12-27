import {ValdrValidationFn} from "../model";

/**
 * Base validator factory. Used to create validator for the given config and checks whether the validator created
 * can work with the given configuration.
 */
export abstract class BaseValidatorFactory {

  /**
   * Check whether this handler can handle (is for the given) config.
   *
   * @param config
   * @return can handle the given config
   */
  abstract canHandle(config: any): boolean;

  /**
   * Factory method to create a validator for the given config, if the validator can handle it {@see canHandle}.
   *
   * @param config: any
   * @return valrd validation functions
   */
  abstract createValidator(config: any): ValdrValidationFn[];
}
