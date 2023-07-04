import {
  BaseValidatorFactory,
  ValdrValidatorFn,
} from '../../../../valdr-ng/src/public-api';
import { Injectable } from '@angular/core';

@Injectable()
export class ValueValidator extends BaseValidatorFactory {
  getConstraintName(): string {
    return 'value';
  }

  createValidator(config: {
    value: string;
    message: string;
  }): ValdrValidatorFn {
    return control => {
      if (control.value === config.value) {
        return null;
      }
      return {
        [this.getConstraintName()]: {
          message: config.message,
        },
      };
    };
  }
}
