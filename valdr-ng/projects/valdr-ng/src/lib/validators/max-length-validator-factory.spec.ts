import { MaxLengthValidatorFactory } from './max-length-validator-factory';
import { ValdrValidatorFn } from '../model';
import { FormControl } from '@angular/forms';

describe('MaxLengthValidatorFactory', () => {
  let maxLengthValidatorHandler: MaxLengthValidatorFactory | null;

  beforeEach(
    () => (maxLengthValidatorHandler = new MaxLengthValidatorFactory())
  );

  afterAll(() => (maxLengthValidatorHandler = null));

  it('should get constraint name', () => {
    // given / when / then
    expect(maxLengthValidatorHandler?.getConstraintName()).toEqual('maxLength');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(
        maxLengthValidatorHandler?.createValidator({
          number: 4,
          message: 'Should be shorter than 4.',
        })
      ).toBeDefined();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = maxLengthValidatorHandler!.createValidator({
          number: 4,
          message: 'Should be shorter than 4.',
        });
      });

      afterAll(() => (validator = null));

      it('should return null for value shorter than 4', () => {
        // given
        const control: FormControl = new FormControl('asd');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should return error for value longer than 4', () => {
        // given
        const control: FormControl = new FormControl('asd1234');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(
          jasmine.objectContaining({
            maxLength: {
              number: 4,
              message: 'Should be shorter than 4.',
            },
          })
        );
      });
    });
  });
});
