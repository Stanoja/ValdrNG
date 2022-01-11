import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';
import {MinLengthValidatorFactory} from "./min-length-validator-factory";

describe('MinLengthValidatorFactory', () => {

  let minLengthValidatorHandler: MinLengthValidatorFactory | null;

  beforeEach(() => minLengthValidatorHandler = new MinLengthValidatorFactory());

  afterAll(() => minLengthValidatorHandler = null);

  it('should handle the config', () => {
    // given / when / then
    expect(minLengthValidatorHandler?.canHandle(null)).toBeFalse();
    expect(minLengthValidatorHandler?.canHandle({})).toBeFalse();
    expect(minLengthValidatorHandler?.canHandle({
      minLength: {
        number: 5,
        message: 'Should be shorter than 5.'
      }
    })).toBeTrue();
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(minLengthValidatorHandler?.createValidator({minLength: {number: 4, message: 'Should be longer than 4.'}}))
        .toBeTruthy();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = minLengthValidatorHandler!.createValidator({
          minLength: {
            number: 4,
            message: 'Should be longer than 4.'
          }
        })[0];
      });

      afterAll(() => validator = null);

      it('should return null for value longer than 4', () => {
        // given
        const control: FormControl = new FormControl('asd123');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should return error for value shorter than 4', () => {
        // given
        const control: FormControl = new FormControl('asd');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(jasmine.objectContaining({
          minLength: {
            number: 4,
            message: 'Should be longer than 4.'
          }
        }));
      });
    })
  })

});
