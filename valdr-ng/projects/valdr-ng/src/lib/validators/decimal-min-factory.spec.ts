import { ValdrValidatorFn } from '../model';
import { FormControl } from '@angular/forms';
import { DecimalMinFactory } from './decimal-min-factory';

describe('DecimalMinFactory', () => {
  let decimalMinFactory: DecimalMinFactory | null;

  beforeEach(() => (decimalMinFactory = new DecimalMinFactory()));

  afterAll(() => (decimalMinFactory = null));

  it('should get constraint name', () => {
    // given / when / then
    expect(decimalMinFactory?.getConstraintName()).toEqual('min');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(
        decimalMinFactory?.createValidator({
          value: 10,
          message: 'Should be greater than 10.',
        })
      ).toBeDefined();
    });

    describe('should validate inclusive properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMinFactory!.createValidator({
          value: 10,
          message: 'Should be greater than 10.',
        });
      });

      afterAll(() => (validator = null));

      it('should not add message on greater value', () => {
        // given
        const control: FormControl = new FormControl(11);

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
            min: {
              value: 10,
              message: 'Should be greater than 10.',
            },
          })
        );
      });
    });

    describe('should validate exclusive properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMinFactory!.createValidator({
          value: 20,
          message: 'Should be greater than 20.',
          inclusive: false,
        });
      });

      afterAll(() => (validator = null));

      it('should not add message on valid value', () => {
        // given
        const control: FormControl = new FormControl(21);

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
            min: {
              value: 20,
              message: 'Should be greater than 20.',
            },
          })
        );
      });
    });
  });
});
