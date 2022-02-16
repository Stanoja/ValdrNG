import {TestBed} from '@angular/core/testing';
import {ValdrNgService} from './valdr-ng.service';
import {ValidatorFn} from '@angular/forms';
import {BaseValidatorFactory} from './validators/base-validator-factory';
import {ValdrValidationFn} from './model';
import {SizeValidatorFactory} from './validators/size-validator-factory';
import {RequiredValidatorFactory} from './validators/required-validator-factory';

describe('ValdrNgService', () => {
  let service: ValdrNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      createValidator(): ValdrValidationFn {
        return () => null;
      },
      getConstraintName(): string {
        return 'testConstraint';
      }
    };

    // when
    service.addValidators([validator]);

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
      } as { [key: string]: ValidatorFn[] };

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
      })
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
});
