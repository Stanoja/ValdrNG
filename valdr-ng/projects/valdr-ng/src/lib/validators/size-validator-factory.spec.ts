import {SizeValidatorFactory} from './size-validator-factory';
import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';

describe('SizeValidatorFactory', () => {
  let sizeValidatorHandler: SizeValidatorFactory | null;

  beforeEach(() => sizeValidatorHandler = new SizeValidatorFactory());

  afterAll(() => sizeValidatorHandler = null);

  it('should handle the config', () => {
    // given / when / then
    expect(sizeValidatorHandler?.canHandle(null)).toBeFalse();
    expect(sizeValidatorHandler?.canHandle({})).toBeFalse();
    expect(sizeValidatorHandler?.canHandle({size: {}})).toBeFalse();
    expect(sizeValidatorHandler?.canHandle({size: {min: 1}})).toBeTrue();
    expect(sizeValidatorHandler?.canHandle({size: {max: 10}})).toBeTrue();
    expect(sizeValidatorHandler?.canHandle({size: {min: 1, max: 10}})).toBeTrue();
  });

  describe('createValidator', () => {

    it('should create the validator', () => {
      // given / when / then
      expect(sizeValidatorHandler?.createValidator({
        size: {
          min: 5,
          max: 10,
          message: 'This field should be between 5 and 10.'
        }
      })).toBeTruthy();
    });

    describe('should validate min properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = sizeValidatorHandler!.createValidator({
          size: {
            min: 5,
            message: 'This field should be longer than 5.'
          }
        })[0];
      });

      afterAll(() => validator = null);

      it('should not add message on valid min', () => {
        // given
        const control = new FormControl();
        control.setValue('Longer value');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on invalid min', () => {
        // given
        const control = new FormControl();
        control.setValue('a');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(jasmine.objectContaining({
          minlength: jasmine.objectContaining({message: 'This field should be longer than 5.'})
        }));
      });
    });

    describe('should validate max properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = sizeValidatorHandler!.createValidator({
          size: {
            max: 10,
            message: 'This field should be shorter than 10.'
          }
        })[0];
      });

      afterAll(() => validator = null);

      it('should not add message on valid min', () => {
        // given
        const control = new FormControl();
        control.setValue('Short');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on invalid min', () => {
        // given
        const control = new FormControl();
        control.setValue('Longer than 10');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(jasmine.objectContaining({
          maxlength: jasmine.objectContaining({message: 'This field should be shorter than 10.'})
        }));
      });
    });
  });

});
