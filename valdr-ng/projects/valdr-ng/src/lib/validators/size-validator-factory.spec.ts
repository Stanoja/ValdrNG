import {SizeValidatorFactory} from './size-validator-factory';
import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';

describe('SizeValidatorFactory', () => {
  let sizeValidatorHandler: SizeValidatorFactory | null;

  beforeEach(() => sizeValidatorHandler = new SizeValidatorFactory());

  afterAll(() => sizeValidatorHandler = null);

  it('should get constraint name', () => {
    // given / when / then
    expect(sizeValidatorHandler?.getConstraintName()).toEqual('size');
  });

  describe('createValidator', () => {

    it('should create the validator', () => {
      // given / when / then
      expect(sizeValidatorHandler?.createValidator({
        min: 5,
        max: 10,
        message: 'This field should be between 5 and 10.'
      })).toBeDefined();
    });

    describe('should validate min properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = sizeValidatorHandler!.createValidator({
          min: 5,
          message: 'This field should be longer than 5.'
        });
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
          max: 10,
          message: 'This field should be shorter than 10.'
        });
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

      it('should fallback to 0 if min is not specified', () => {
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
