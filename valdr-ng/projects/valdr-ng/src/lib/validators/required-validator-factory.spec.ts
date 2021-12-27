import {RequiredValidatorFactory} from "./required-validator-factory";
import {FormControl} from "@angular/forms";
import {ValdrValidationFn} from "../model";

describe('RequiredValidatorHandler', () => {
  let requiredValidatorHandler: RequiredValidatorFactory | null;

  beforeEach(() => requiredValidatorHandler = new RequiredValidatorFactory());

  afterAll(() => requiredValidatorHandler = null);

  it('should handle the config', () => {
    // given / when / then
    expect(requiredValidatorHandler?.canHandle(null)).toBeFalse();
    expect(requiredValidatorHandler?.canHandle({})).toBeFalse();
    expect(requiredValidatorHandler?.canHandle({required: {}})).toBeTrue();
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(requiredValidatorHandler?.createValidator({required: {message: 'This field is required.'}}))
        .toBeTruthy();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = requiredValidatorHandler!.createValidator({required: {message: 'This field is required.'}})[0];
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
