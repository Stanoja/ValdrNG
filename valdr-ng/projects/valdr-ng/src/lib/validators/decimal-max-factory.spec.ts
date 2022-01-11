import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';
import {DecimalMaxFactory} from './decimal-max-factory';

describe('DecimalMaxFactory', () => {

  let decimalMaxFactory: DecimalMaxFactory | null;

  beforeEach(() => decimalMaxFactory = new DecimalMaxFactory());

  afterAll(() => decimalMaxFactory = null);

  it('should handle the config', () => {
    // given / when / then
    expect(decimalMaxFactory?.canHandle(null)).toBeFalse();
    expect(decimalMaxFactory?.canHandle({})).toBeFalse();
    expect(decimalMaxFactory?.canHandle({
      max: {
        value: 10,
        message: 'Should be less than 10.'
      }
    })).toBeTrue();
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(decimalMaxFactory?.createValidator({
        max: {
          value: 10,
          message: 'Should be less than 10.'
        }
      })).toBeTruthy();
    });

    describe('should validate inclusive properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMaxFactory!.createValidator({
          max: {
            value: 10,
            message: 'Should be less than 10.'
          }
        })[0];
      });

      afterAll(() => validator = null);

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
        expect(result).toEqual(jasmine.objectContaining({
          max: {
            value: 10,
            message: 'Should be less than 10.'
          }
        }));
      });
    })

    describe('should validate exclusive properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = decimalMaxFactory!.createValidator({
          max: {
            value: 20,
            message: 'Should be less than 20.',
            inclusive: false
          }
        })[0];
      });

      afterAll(() => validator = null);

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
        expect(result).toEqual(jasmine.objectContaining({
          max: {
            value: 20,
            message: 'Should be less than 20.'
          }
        }));
      });
    })

  })
});
