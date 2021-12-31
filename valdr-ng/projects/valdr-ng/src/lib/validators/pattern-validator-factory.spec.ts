import {PatternValidatorFactory} from './pattern-validator-factory';
import {ValdrValidationFn} from '../model';
import {FormControl} from '@angular/forms';

describe('PatternValidatorFactory', () => {

  let patternValidatorHandler: PatternValidatorFactory | null;

  beforeEach(() => patternValidatorHandler = new PatternValidatorFactory());

  afterAll(() => patternValidatorHandler = null);

  it('should handle the config', () => {
    // given / when / then
    expect(patternValidatorHandler?.canHandle(null)).toBeFalse();
    expect(patternValidatorHandler?.canHandle({})).toBeFalse();
    expect(patternValidatorHandler?.canHandle({pattern: {value: '[a-zA-Z ]*', message: 'Should match /d/.'}})).toBeTrue();
  });

  describe('createValidator', () => {
    it('should create the validator', () => {
      // given / when / then
      expect(patternValidatorHandler?.createValidator({pattern: {value: '[a-zA-Z ]*', message: 'Should match /d/.'}}))
        .toBeTruthy();
    });

    describe('should validate properly', () => {
      let validator: ValdrValidationFn | null = {} as any;

      beforeEach(() => {
        validator = patternValidatorHandler!.createValidator({
          pattern: {
            value: '[a-zA-Z ]*',
            message: 'Should match \'[a-zA-Z ]*\'.'
          }
        })[0];
      });

      afterAll(() => validator = null);

      it('should not add message on valid pattern', () => {
        // given
        const control: FormControl = new FormControl();
        control.setValue('Some value');

        // when
        const result = validator!(control);

        // then
        expect(result).toBeNull();
      });

      it('should add message on invalid pattern', () => {
        // given
        const control: FormControl = new FormControl('123!@#@');

        // when
        const result = validator!(control);

        // then
        expect(result).toEqual(jasmine.objectContaining({
          pattern: {
            requiredPattern: '^[a-zA-Z ]*$',
            actualValue: '123!@#@',
            message: 'Should match \'[a-zA-Z ]*\'.'
          }
        }));
      });
    })
  })
});
