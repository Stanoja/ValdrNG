import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';
import {EmailValidatorFactory} from './email-validator-factory';

describe('EmailValidatorFactory', () => {

  let emailValidatorFactory: EmailValidatorFactory | null;

  beforeEach(() => emailValidatorFactory = new EmailValidatorFactory());

  afterAll(() => emailValidatorFactory = null);

  it('should handle the config', () => {
    // given / when / then
    expect(emailValidatorFactory?.canHandle(null)).toBeFalse();
    expect(emailValidatorFactory?.canHandle({})).toBeFalse();
    expect(emailValidatorFactory?.canHandle({email: {message: 'Should be valid email.'}})).toBeTrue();
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(emailValidatorFactory?.createValidator({email: {message: 'Should be valid email.'}}))
        .toBeTruthy();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = emailValidatorFactory!.createValidator({
          email: {
            message: 'Should be valid email.'
          }
        })[0];
      });

      afterAll(() => validator = null);

      it('should not add message on valid pattern', () => {
        // given
        const control: FormControl = new FormControl('qqq@myemail.com');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on invalid pattern', () => {
        // given
        const control: FormControl = new FormControl('asd');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(jasmine.objectContaining({
          email: {
            message: 'Should be valid email.'
          }
        }));
      });
    })
  })
});
