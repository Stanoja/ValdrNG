import {ValdrValidatorFn} from '../model';
import {FormControl} from '@angular/forms';
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
        expect(validator!(new FormControl())).toBeNull();
        expect(validator!(new FormControl(''))).toBeNull();
      });

      it('should return null for valid url', () => {
        // given / when / then
        expect(validator!(new FormControl('http://tase.com'))).toBeNull();
        expect(validator!(new FormControl('https://tase.com.qq'))).toBeNull();
        expect(validator!(new FormControl('http://127.0.0.1'))).toBeNull();
        expect(validator!(new FormControl('ftp://tase'))).toBeNull();
      });

      it('should return error for invalid url', () => {
        // given / when
        const result = validator!(new FormControl('invalid url'));

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
