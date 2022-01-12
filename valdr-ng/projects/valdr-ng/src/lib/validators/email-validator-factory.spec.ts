import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';
import {EmailValidatorFactory} from './email-validator-factory';

describe('EmailValidatorFactory', () => {

  let emailValidatorFactory: EmailValidatorFactory | null;

  beforeEach(() => emailValidatorFactory = new EmailValidatorFactory());

  afterAll(() => emailValidatorFactory = null);

  it('should get constraint name', () => {
    // given / when / then
    expect(emailValidatorFactory?.getConstraintName()).toEqual('email');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(emailValidatorFactory?.createValidator({message: 'Should be valid email.'}))
        .toBeDefined();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = emailValidatorFactory!.createValidator({message: 'Should be valid email.'})[0];
      });

      afterAll(() => validator = null);

      it('should return null on valid email', () => {
        // given
        const control: FormControl = new FormControl('qqq@myemail.com');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should return validation result on invalid email', () => {
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
