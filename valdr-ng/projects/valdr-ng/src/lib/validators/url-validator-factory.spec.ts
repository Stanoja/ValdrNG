import {ValdrValidatorFn} from '../model';
import {UntypedFormControl} from '@angular/forms';
import {MinLengthValidatorFactory} from "./min-length-validator-factory";
import {UrlValidatorFactory} from "./url-validator-factory";

describe('MinLengthValidatorFactory', () => {

  let urlValidatorFactory: UrlValidatorFactory | null;

  beforeEach(() => urlValidatorFactory = new UrlValidatorFactory());

  afterAll(() => urlValidatorFactory = null);

  it('should get constraint name', () => {
    // given / when / then
    expect(urlValidatorFactory?.getConstraintName()).toEqual('url');
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(urlValidatorFactory?.createValidator({message: 'Should be a valid URL.'})).toBeDefined();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidatorFn | null = {} as any;

      beforeEach(() => {
        validator = urlValidatorFactory!.createValidator({message: 'Should be a valid URL.'});
      });

      afterAll(() => validator = null);

      it('should return null for null or empty value', () => {
        // given / when / then
        expect(validator!(new UntypedFormControl())).toBeNull();
        expect(validator!(new UntypedFormControl(''))).toBeNull();
      });

      it('should return null for valid url', () => {
        // given / when / then
        expect(validator!(new UntypedFormControl('http://tase.com'))).toBeNull();
        expect(validator!(new UntypedFormControl('https://tase.com.qq'))).toBeNull();
        expect(validator!(new UntypedFormControl('http://127.0.0.1'))).toBeNull();
        expect(validator!(new UntypedFormControl('ftp://tase'))).toBeNull();
      });

      it('should return error for invalid url', () => {
        // given / when
        const result = validator!(new UntypedFormControl('invalid url'));

        // then
        expect(result).toEqual(jasmine.objectContaining({
          url: {
            message: 'Should be a valid URL.'
          }
        }));
      });
    })
  })

});
