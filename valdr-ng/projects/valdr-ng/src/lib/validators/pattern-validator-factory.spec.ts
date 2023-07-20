import { PatternValidatorFactory } from './pattern-validator-factory';
import { ValdrValidatorFn } from '../model';
import { FormControl } from '@angular/forms';

describe('PatternValidatorFactory', () => {
  let patternValidatorHandler: PatternValidatorFactory | null;

  beforeEach(() => (patternValidatorHandler = new PatternValidatorFactory()));

  afterAll(() => (patternValidatorHandler = null));

  it('should get constraint name', () => {
    // given / when / then
    expect(patternValidatorHandler?.getConstraintName()).toEqual('pattern');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(
        patternValidatorHandler?.createValidator({
          value: '[a-zA-Z ]*',
          message: 'Should match /d/.',
        })
      ).toBeDefined();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = patternValidatorHandler!.createValidator({
          value: '[a-zA-Z ]*',
          message: "Should match '[a-zA-Z ]*'.",
        });
      });

      afterAll(() => (validator = null));

      it('should not add message on valid pattern', () => {
        // given
        const control: FormControl = new FormControl();
        control.setValue('Some value');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on invalid pattern', () => {
        // given
        const control: FormControl = new FormControl('123!@#@');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(
          jasmine.objectContaining({
            pattern: {
              requiredPattern: '^[a-zA-Z ]*$',
              actualValue: '123!@#@',
              message: "Should match '[a-zA-Z ]*'.",
            },
          })
        );
      });
    });
  });
});
