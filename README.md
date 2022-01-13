# ValdrNG

Angular reactive forms util which generates configuration and validators for constraints.

Inspired by [Valdr for AngularJS](https://github.com/netceteragroup/valdr).

## Why ValdrNG?

Angular form creation and creating validators manually for each field for a model is too much boilerplate code. Having a
configuration and a service which creates reactive form configuration helps to cut down on manual form creation, which is especially
useful when working with large and complex forms.

Very similar to [Valdr for AngularJS](https://github.com/netceteragroup/valdr),
there are few more advantages to this:
* Less form creation boilerplate
* Possibility to generate the constraints from the models that are present on your back-end (see [valdr-bean-validation](https://github.com/netceteragroup/valdr-bean-validation) for Java)
* Compliant with [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
* Easy extension with custom validators 

## Install

#### [NPM](http://www.npmjs.com)

1. Install `ValdrNg`

```bash
npm i valdr-ng
```

2. Register the `ValdrNgModule` inapplication module.

```typescript
@NgModule({
  imports: [
    ValdrNgModule
  ]
})
export class AppModule {
}
```

3. Set the constraints

```typescript
export class AppModule {
  constructor(private valdrNgService: ValdrNgService) {
    valdrNgService.setConstraints({
      'Person': {
        'firstName': {
          'required': {
            'message': 'First name is required.'
          },
          'size': {
            'min': 2,
            'max': 20,
            'message': 'First name must be between 2 and 20 characters.'
          }
        },
        'username': {
          'pattern': {
            'value': '[a-zA-Z]{4,}',
            'message': 'Username must be longer than 4 characters and match \'a-zA-Z\'.'
          }
        }
      }
    });
  }
}
```

4. Use it to create form configuration from the model and model name

```typescript
class MyComponent implements OnInit {
  personForm: FormGroup;

  person = {
    firstName: 'John',
    username: ''
  };

  constructor(private valdrNgService: ValdrNgService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const controls = this.valdrNgService.createFormGroupControls(this.person, 'Person');
    this.personForm = this.fb.group(controls);
  }
}
```

5. The form is ready, now we can show messages for the fields

```html
<form [formGroup]="personForm">
  <label for="firstName">First name:</label>
  <input id="firstName" formControlName="firstName">

  <!-- Simple error handling -->
  <div *ngIf="personForm.get('firstName')?.errors as err">
    <p *ngIf="err['required'] as req">
      {{req.message}}
    </p>
  </div>

  <label for="username">Username:</label>
  <input id="username" formControlName="username">
  <!-- Other error handling component  -->
</form>

```

## Constraints JSON
The JSON object which defines the validation rules has the following structure:
```json
{
  "TypeName": {
    "ValidatorName": {
      "message": "My Error Message"
    }
  }
}
```
* **TypeName** - The type of the object
* **FieldName** - The field name
* **ValidatorName** - Name of the validator
* **message** - The message which should be attached on the validation error

**Note:** The `ValidatorName` object can contain other validator arguments besides `message`.

### Example:
```json
{
  "Person": {
    "firstName": {
      "required": {
        "message": "First name is required."
      },
      "size": {
        "min": 2,
        "max": 20,
        "message": "First name must be between 2 and 20 characters."
      }
    },
    "username": {
      "pattern": {
        "value": "[a-zA-Z]{4,}",
        "message": "Username must be longer than 4 characters and match 'a-zA-Z'."
      }
    }
  }
}
```

## Validators

Built-in validators:
* **size** 
* **min**
* **max**
* **minLength**
* **maxLength**
* **email**
* **pattern**
* **url**

**NOTE:** For more details on the built-in validators see [valdr-ng lib readme](valdr-ng/projects/valdr-ng/README.md).

## Custom validator

1. Create a validator by overriding [`BaseValidatorFactory`](valdr-ng/projects/valdr-ng/src/lib/validators/base-validator-factory.ts):

```typescript
@Injectable()
class MyValidator extends BaseValidatorFactory {
  getConstraintName() {
    return 'validByValue';
  }

  createValidator(config: {value: string, message: string}): ValdrValidationFn[] {
    const validateFn = ({value}: AbstractControl): ValidationErrors | null => {
      if (value === null || value === config.value) {
        return null;
      }
      return {
        [this.getConstraintName()]: {
          message
        }
      };
    }
    return [validateFn];
  }
}
```

2. Register it in `ValdrNgModule` or `ValdrNgService`:

   - In the module

```typescript
@NgModule({
  imports: [
    ValdrNgModule.forRoot([MyValidator])
  ],
  providers: [
    MyValidator
  ]
})
export class AppModule {
}
```

   - Directly in the service

```typescript

@NgModule({
  imports: [
    ValdrNgModule
  ],
  providers: [
    MyValidator
  ]
})
export class AppModule {
  constructor(valdrNgService: ValdrNgService,
              myValidator: MyValidator) {
    valdrNgService.addValidators([myValidator]);
  }
}
```

3. Use it in constraints:

```typescript
export class AppModule {
  constructor(valdrNgService: ValdrNgService,
              myValidator: MyValidator) {
    valdrNgService.addValidators([myValidator]);
    valdrNgService.setConstraints({
      'Person': {
        'password': {
          'validByValue': {
            'value': 'p455w0rd',
            'message': 'Invalid password!'
          }
        }
      }
    });
  }
}
```

### How it is integrated with Angular Forms
ValdrNG uses the provided [Angular validators](https://github.com/angular/angular/blob/master/packages/forms/src/validators.ts)
and wraps them by validator name, and returning the `message` along with the validation result.

That makes couple of things easier:
* Migration of the current forms to ValdrNG (validation result is extended)
* Easily accessible a dedicated message for each field (see the usage)

