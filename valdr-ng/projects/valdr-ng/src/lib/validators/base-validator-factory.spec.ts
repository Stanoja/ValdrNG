import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidationFn} from '../model';

describe('BaseValidatorFactory', () => {
  let validatorHandler: BaseValidatorFactory | null = null;

  beforeEach(() => {
    validatorHandler = ({
      createValidator(): ValdrValidationFn[] {
        return [() => null];
      },
      canHandle(config: any): boolean {
        return !!config;
      }
    }) as BaseValidatorFactory;
  });

  afterAll(() => validatorHandler = null);

  it('should create validator', () => {
    // given / when / then
    expect(validatorHandler?.createValidator).toBeTruthy();
  });

  it('should handle config', () => {
    // given / when / then
    expect(validatorHandler?.canHandle(null)).toBeFalse();
    expect(validatorHandler?.canHandle({})).toBeTrue();
  });
});
