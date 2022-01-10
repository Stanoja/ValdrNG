import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';
import {DecimalMinFactory} from './decimal-min-factory';

describe('DecimalMinFactory', () => {

  let decimalMinFactory: DecimalMinFactory | null;

  beforeEach(() => decimalMinFactory = new DecimalMinFactory());

  afterAll(() => decimalMinFactory = null);

  it('should handle the config', () => {
    // given / when / then
    expect(decimalMinFactory?.canHandle(null)).toBeFalse();
    expect(decimalMinFactory?.canHandle({})).toBeFalse();
    expect(decimalMinFactory?.canHandle({
      'javax.validation.constraints.DecimalMin': {
        value: 10,
        message: 'Should be greater than 10.'
      }
    })).toBeTrue();
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(decimalMinFactory?.createValidator({
        'javax.validation.constraints.DecimalMin': {
          value: 10,
          message: 'Should be greater than 10.'
        }
      })).toBeTruthy();
    });

    describe('should validate inclusive properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMinFactory!.createValidator({
          'javax.validation.constraints.DecimalMin': {
            value: 10,
            message: 'Should be greater than 10.'
          }
        })[0];
      });

      afterAll(() => validator = null);

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
        expect(result).toEqual(jasmine.objectContaining({
          'javax.validation.constraints.DecimalMin': {
            value: 10,
            message: 'Should be greater than 10.'
          }
        }));
      });
    })

    describe('should validate exclusive properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMinFactory!.createValidator({
          'javax.validation.constraints.DecimalMin': {
            value: 20,
            message: 'Should be greater than 20.',
            inclusive: false
          }
        })[0];
      });

      afterAll(() => validator = null);

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
        expect(result).toEqual(jasmine.objectContaining({
          'javax.validation.constraints.DecimalMin': {
            value: 20,
            message: 'Should be greater than 20.'
          }
        }));
      });
    })

  })
});
