import {TestBed} from '@angular/core/testing';
import {ValdrNgService} from './valdr-ng.service';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {BaseValidatorFactory} from './validators/base-validator-factory';
import {CustomValidators, ValdrValidatorFn} from './model';
import {SizeValidatorFactory} from './validators/size-validator-factory';
import {RequiredValidatorFactory} from './validators/required-validator-factory';

describe('ValdrNgService', () => {
  let service: ValdrNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {provide: BaseValidatorFactory, useClass: SizeValidatorFactory, multi: true},
        {provide: BaseValidatorFactory, useClass: RequiredValidatorFactory, multi: true},
      ]
    });
    service = TestBed.inject(ValdrNgService);
  });

  it('should be created', () => {
    // given / when / then
    expect(service).toBeTruthy();
  });

  it('should set constraints', () => {
    // given
    const constraints = {
      'Person': {
        'firstName': {
          'size': {
            'min': 2,
            'max': 20,
            'message': 'First name must be between 2 and 20 characters.'
          }
        }
      }
    };

    // when
    service.setConstraints(constraints);

    // then
    expect((service as any).constraints).toBe(constraints);
  });

  it('it should add valdr validators', () => {
    // given
    const validator: BaseValidatorFactory = {
      createValidator(): ValdrValidatorFn {
        return () => null;
      },
      getConstraintName(): string {
        return 'testConstraint';
      }
    };

    // when
    service.addValidatorFactories([validator]);

    // then
    expect((service as any).validatorsPerField['testConstraint']).toBe(validator);
  });

  describe('createValidators', () => {
    beforeEach(() => {
      service.setConstraints({
        'Person': {
          'firstName': {
            'size': {
              'min': 2,
              'max': 20,
              'message': 'First name must be between 2 and 20 characters.'
            },
            'required': {
              'message': 'First name is required.'
            }
          },
          'address': {
            'required': {
              'message': 'Street is required.'
            }
          }
        }
      })
    });

    it('should throw error if the type is not present', () => {
      // given / when / then
      expect(() => service.createFormGroupControls({}, 'SomeModel'))
        .toThrow(new Error('No constraints provided for type \'SomeModel\'.'));
    })

    it('should create constraints for first name', () => {
      // given
      const model = {firstName: 'Stanoja'};

      // when
      const formGroup = service.createFormGroupControls(model, 'Person');

      // then
      expect(formGroup).toBeDefined();
      expect(formGroup.firstName).toEqual(jasmine.arrayContaining(['Stanoja']));
    });

    it('should create form group controls for fields which are not present in the constraints', () => {
      // given
      const model = {
        firstName: 'Stanoja',
        secondName: 'S'
      };

      // when
      const formGroup = service.createFormGroupControls(model, 'Person');

      // then
      expect(formGroup).toEqual(jasmine.objectContaining({
        firstName: jasmine.arrayContaining([model.firstName, jasmine.any(Array)]),
        secondName: jasmine.arrayContaining([model.secondName])
      }));
      expect((formGroup.secondName.length)).toBe(1);
    });

    it('should create additional constraints for fields which are not present in the model', () => {
      // given
      const model = {firstName: 'Stanoja', lastName: 'Sst'};
      const validatorFn = () => null;
      const additionalControls = {
        lastName: [validatorFn]
      } as CustomValidators<typeof model>;

      // when
      const formGroup = service.createFormGroupControls(model, 'Person', additionalControls);

      // then
      expect(formGroup.lastName).toEqual(jasmine.arrayContaining(['Sst', [validatorFn]]))
    });
  });

  describe('getValidatorsForField', () => {
    beforeEach(() => {
      service.setConstraints({
        'Person': {
          'firstName': {
            'size': {
              'min': 2,
              'max': 20,
              'message': 'First name must be between 2 and 20 characters.'
            },
            'required': {
              'message': 'First name is required.'
            }
          }
        }
      });
    });

    it('should throw error if the type is not present', () => {
      // given / when / then
      expect(() => service.getValidatorsForField('SomeModel', 'SomeField'))
        .toThrow(new Error('No constraints provided for type \'SomeModel\'.'));
    });

    it('should throw error if the field is not present', () => {
      // given / when / then
      expect(() => service.getValidatorsForField('Person', 'SomeField'))
        .toThrow(new Error('No constraints provided for \'Person.SomeField\'.'));
    });

    it('should get validators for field', () => {
      // given / when
      const validators = service.getValidatorsForField('Person', 'firstName');

      // then
      expect(validators).toHaveSize(2);
    });


    it('should warn if no validators are available for constraint', () => {
      // given
      (<any> service).validatorsPerField['required'] = null;
      spyOn(console, 'warn').and.callThrough();

      // when
      const validators = service.getValidatorsForField('Person', 'firstName');

      // then
      expect(console.warn).toHaveBeenCalledOnceWith('No validator found for constraint \'required\'.')
      expect(validators).toHaveSize(1);
    });
  });

  describe('addValidatorsToFormGroupControls', () => {
    let formGroup: UntypedFormGroup | null = null;

    beforeEach(() => {
      const formGroupControls = {
        firstName: ['First name'],
        lastName: ['Last name', () => {}],
        city: ['City', [() => {}]],
      };
      formGroup = TestBed.inject(UntypedFormBuilder).group(formGroupControls);
    });

    afterAll(() => {
      formGroup = null;
    });

    it('should add validators to control without validator', () => {
      // given
      service.setConstraints({
        'Person': {
          'firstName': {
            'required': {
              'message': 'First name is required.'
            }
          }
        }
      });

      // when
      service.addValidators(formGroup!, 'Person');

      // then
      const validator = formGroup!.get('firstName')!.validator!;
      expect(validator).toBeDefined();
      expectRequiredValidator(validator);
    });

    it('should add validators to control with existing validator', () => {
      // given
      service.setConstraints({
        'Person': {
          'lastName': {
            'required': {
              'message': 'Last name is required.'
            }
          }
        }
      });

      // when
      service.addValidators(formGroup!, 'Person');

      // then
      const validator = formGroup!.get('lastName')!.validator!;
      expect(validator).toBeDefined();
      expectRequiredValidator(validator)
    });

    it('should add validators to control with existing validators', () => {
      // given
      service.setConstraints({
        'Person': {
          'city': {
            'required': {
              'message': 'City is required.'
            }
          }
        }
      });

      // when
      service.addValidators(formGroup!, 'Person');

      // then;
      const validator = formGroup!.get('city')!.validator!;
      expect(validator).toBeDefined();
      expectRequiredValidator(validator);
    });

    function expectRequiredValidator(validator: ValidatorFn) {
      const control = new UntypedFormControl('');
      expect(validator(control)).toEqual(jasmine.objectContaining({
        required: {
          message: jasmine.stringContaining('is required')
        }
      }));
    }
  });

  describe('validate', () => {
    beforeEach(() => {
      service.setConstraints({
        'Person': {
          'city': {
            'required': {
              'message': 'City is required.'
            }
          }
        }
      });
    });

    it('should validate valid value', () => {
      // given
      const value = 'City';

      // when
      const validationResult = service.validate('Person', 'city', value);

      // then
      expect(validationResult).toEqual(null);
    });

    it('should validate invalid value', () => {
      // given
      const value = '';

      // when
      const validationResult = service.validate('Person', 'city', value);

      // then
      expect(validationResult).toEqual({
        required: {
          message: jasmine.stringContaining('City is required')
        }
      });
    });
  });
});
