import {BaseValidatorFactory} from './base-validator-factory';
import {ValdrValidatorFn} from '../model';

describe('BaseValidatorFactory', () => {
  let validatorHandler: BaseValidatorFactory | null = null;

  beforeEach(() => {
    validatorHandler = ({
      createValidator(): ValdrValidatorFn {
        return () => null;
      },
      getConstraintName(): string {
        return 'constraintName';
      }
    }) as BaseValidatorFactory;
  });

  afterAll(() => validatorHandler = null);

  it('should create validator', () => {
    // given / when / then
    expect(validatorHandler?.createValidator).toBeDefined();
  });

  it('should get constraint name', () => {
    // given / when / then
    expect(validatorHandler?.getConstraintName()).toEqual('constraintName');
  });
});
