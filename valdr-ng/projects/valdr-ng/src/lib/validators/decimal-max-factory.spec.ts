import { ValdrValidatorFn } from '../model';
import { FormControl } from '@angular/forms';
import { DecimalMaxFactory } from './decimal-max-factory';

describe('DecimalMaxFactory', () => {
  let decimalMaxFactory: DecimalMaxFactory | null;

  beforeEach(() => (decimalMaxFactory = new DecimalMaxFactory()));

  afterAll(() => (decimalMaxFactory = null));

  it('should get constraint name', () => {
    // given / when / then
    expect(decimalMaxFactory?.getConstraintName()).toEqual('max');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(
        decimalMaxFactory?.createValidator({
          value: 10,
          message: 'Should be less than 10.',
        })
      ).toBeDefined();
    });

    describe('should validate inclusive properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMaxFactory!.createValidator({
          value: 10,
          message: 'Should be less than 10.',
        });
      });

      afterAll(() => (validator = null));

      it('should not add message on lesser value', () => {
        // given
        const control: FormControl = new FormControl(9);

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on equal value', () => {
        // given
        const control: FormControl = new FormControl('10');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(
          jasmine.objectContaining({
            max: {
              value: 10,
              message: 'Should be less than 10.',
            },
          })
        );
      });
    });

    describe('should validate exclusive properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMaxFactory!.createValidator({
          value: 20,
          message: 'Should be less than 20.',
          inclusive: false,
        });
      });

      afterAll(() => (validator = null));

      it('should not add message on lesser value', () => {
        // given
        const control: FormControl = new FormControl(19);

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on equal value', () => {
        // given
        const control: FormControl = new FormControl('20');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(
          jasmine.objectContaining({
            max: {
              value: 20,
              message: 'Should be less than 20.',
            },
          })
        );
      });
    });
  });
});
