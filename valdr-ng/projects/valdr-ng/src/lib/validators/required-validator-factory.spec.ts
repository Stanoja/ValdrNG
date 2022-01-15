import {RequiredValidatorFactory} from './required-validator-factory';
import {FormControl} from '@angular/forms';
import {ValdrValidationFn} from '../model';

describe('RequiredValidatorHandler', () => {
  let requiredValidatorHandler: RequiredValidatorFactory | null;

  beforeEach(() => requiredValidatorHandler = new RequiredValidatorFactory());

  afterAll(() => requiredValidatorHandler = null);

  it('should get constraint name', () => {
    // given / when / then
    expect(requiredValidatorHandler?.getConstraintName()).toEqual('required');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(requiredValidatorHandler?.createValidator({message: 'This field is required.'}))
        .toBeDefined();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = requiredValidatorHandler!.createValidator({message: 'This field is required.'});
      });

      afterAll(() => validator = null);

      it('should not add message on valid required', () => {
        // given
        const control: FormControl = new FormControl();
        control.setValue('Some value');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on valid required', () => {
        // given
        const control: FormControl = new FormControl();

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(jasmine.objectContaining({
          required: {
            message: 'This field is required.'
          }
        }));
      });
    })
  });
});
