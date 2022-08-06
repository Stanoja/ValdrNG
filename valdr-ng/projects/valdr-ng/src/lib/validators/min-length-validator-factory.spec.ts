import {ValdrValidatorFn} from '../model';
import {UntypedFormControl} from '@angular/forms';
import {MinLengthValidatorFactory} from "./min-length-validator-factory";

describe('MinLengthValidatorFactory', () => {

  let minLengthValidatorHandler: MinLengthValidatorFactory | null;

  beforeEach(() => minLengthValidatorHandler = new MinLengthValidatorFactory());

  afterAll(() => minLengthValidatorHandler = null);

  it('should get constraint name', () => {
    // given / when / then
    expect(minLengthValidatorHandler?.getConstraintName()).toEqual('minLength');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(minLengthValidatorHandler?.createValidator({number: 4, message: 'Should be longer than 4.'}))
        .toBeDefined();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = minLengthValidatorHandler!.createValidator({
          number: 4,
          message: 'Should be longer than 4.'
        });
      });

      afterAll(() => validator = null);

      it('should return null for value longer than 4', () => {
        // given
        const control: UntypedFormControl = new UntypedFormControl('asd123');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should return error for value shorter than 4', () => {
        // given
        const control: UntypedFormControl = new UntypedFormControl('asd');

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
