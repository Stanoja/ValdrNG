import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValdrConstraints} from '../../../valdr-ng/src/lib/model';
import {ValdrNgService} from '../../../valdr-ng/src/lib/valdr-ng.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'valdr-ng-showcase';

  personForm!: FormGroup;
  personFormWithValdrNg!: FormGroup;

  private constraints: ValdrConstraints = {
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
          'message': 'Usename must be longer than 4 characters and match \'a-zA-Z\'.'
        }
      },
      'email': {
        'email': {
          'message': 'Invalid email.'
        }
      },
      'age': {
        'min': {
          'value': 10,
          'inclusive': true,
          'message': 'Age should be greater or equal to 10.'
        },
        'max': {
          'value': 100,
          'message': 'Age should be less than or equal to 100.'
        },
      }
    }
  };

  private person = {
    firstName: 'John',
    username: '',
    email: '',
    age: null
  };

  constructor(private valdrNgService: ValdrNgService,
              private fb: FormBuilder) {
    valdrNgService.setConstraints(this.constraints);
  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      firstName: [this.person.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      username: [this.person.username, Validators.pattern('[a-zA-Z]{4,}')],
      email: [this.person.email, Validators.email],
      age: [this.person.age, [Validators.min(10), Validators.max(100)]]
    });
    const controls = this.valdrNgService.createFormGroupControls(this.person, 'Person');
    this.personFormWithValdrNg = this.fb.group(controls);
  }

  isFirstNameInvalidInLength() {
    return this.personForm.touched && this.firstNameControl?.errors ? this.firstNameControl.errors['minlength']
      || this.firstNameControl.errors['maxlength'] : false;
  }

  isFirstNameInvalidInRequired() {
    return this.personForm.touched && this.firstNameControl?.errors ? this.firstNameControl.errors['required'] : false;
  }

  isUsernameInvalid() {
    return this.personForm.touched && this.usernameControl?.errors ? this.usernameControl.errors['pattern'] : false;
  }

  isEmailInvalid() {
    return this.personForm.touched && this.emailControl?.errors ? this.emailControl.errors['email'] : false;
  }

  isMaxAgeInvalid() {
    return this.personForm.touched && this.ageControl?.errors ? this.ageControl.errors['max'] : false;
  }

  isMinAgeInvalid() {
    return this.personForm.touched && this.ageControl?.errors ? this.ageControl.errors['min'] : false;
  }

  private get firstNameControl() {
    return this.personForm.get('firstName');
  }

  private get usernameControl() {
    return this.personForm.get('username');
  }

  private get emailControl() {
    return this.personForm.get('email');
  }

  private get ageControl() {
    return this.personForm.get('age');
  }
}
