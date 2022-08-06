import {ValdrValidatorFn} from '../model';
import {UntypedFormControl} from '@angular/forms';
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
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = emailValidatorFactory!.createValidator({message: 'Should be valid email.'});
      });

      afterAll(() => validator = null);

      it('should return null on valid email', () => {
        // given
        const control: UntypedFormControl = new UntypedFormControl('qqq@myemail.com');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should return validation result on invalid email', () => {
        // given
        const control: UntypedFormControl = new UntypedFormControl('asd');

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
