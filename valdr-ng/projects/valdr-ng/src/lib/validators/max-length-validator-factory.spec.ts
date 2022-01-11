import {MaxLengthValidatorFactory} from './max-length-validator-factory';
import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';

describe('MaxLengthValidatorFactory', () => {

  let maxLengthValidatorHandler: MaxLengthValidatorFactory | null;

  beforeEach(() => maxLengthValidatorHandler = new MaxLengthValidatorFactory());

  afterAll(() => maxLengthValidatorHandler = null);

  it('should handle the config', () => {
    // given / when / then
    expect(maxLengthValidatorHandler?.canHandle(null)).toBeFalse();
    expect(maxLengthValidatorHandler?.canHandle({})).toBeFalse();
    expect(maxLengthValidatorHandler?.canHandle({
      maxLength: {
        number: 5,
        message: 'Should be shorter than 5.'
      }
    })).toBeTrue();
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(maxLengthValidatorHandler?.createValidator({maxLength: {number: 4, message: 'Should be shorter than 4.'}}))
        .toBeTruthy();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = maxLengthValidatorHandler!.createValidator({
          maxLength: {
            number: 4,
            message: 'Should be shorter than 4.'
          }
        })[0];
      });

      afterAll(() => validator = null);

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
        expect(result).toEqual(jasmine.objectContaining({
          maxLength: {
            number: 4,
            message: 'Should be shorter than 4.'
          }
        }));
      });
    })
  })

});
