import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Person } from '../model/person';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleFormComponent implements OnInit {
  private readonly myUrlRegex =
    /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?$/;

  @Input() person: Person;

  personForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      firstName: [
        this.person.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      username: [this.person.username, Validators.pattern('[a-zA-Z]{4,}')],
      email: [this.person.email, Validators.email],
      age: [this.person.age, [Validators.min(10), Validators.max(100)]],
      homepage: [this.person.homepage, [this.urlValidatorFn]],
      addressLine1: [
        this.person.addressLine1,
        [Validators.minLength(2), Validators.maxLength(20)],
      ],
      myValue: [this.person.myValue],
    });
  }

  isFirstNameInvalidInLength() {
    const errors = this.personForm.get('firstName')?.errors;
    return (
      this.personForm.touched &&
      (errors?.['minlength'] || errors?.['maxlength'])
    );
  }

  isFirstNameInvalidInRequired() {
    return (
      this.personForm.touched &&
      this.personForm.get('firstName')?.errors?.['required']
    );
  }

  isUsernameInvalid() {
    return (
      this.personForm.touched &&
      this.personForm.get('username')?.errors?.['pattern']
    );
  }

  isEmailInvalid() {
    return (
      this.personForm.touched && this.personForm.get('email')?.errors?.['email']
    );
  }

  isMaxAgeInvalid() {
    return (
      this.personForm.touched && this.personForm.get('age')?.errors?.['max']
    );
  }

  isMinAgeInvalid() {
    return (
      this.personForm.touched && this.personForm.get('age')?.errors?.['min']
    );
  }

  isHomepageInvalid() {
    return (
      this.personForm.touched &&
      this.personForm.get('homepage')?.errors?.['url']
    );
  }

  isAddressLine1InvalidInMaxLength() {
    return (
      this.personForm.touched &&
      this.personForm.get('addressLine1')?.errors?.['maxlength']
    );
  }

  isAddressLine1InvalidInMinLength() {
    return (
      this.personForm.touched &&
      this.personForm.get('addressLine1')?.errors?.['minlength']
    );
  }

  isMyValueInvalid() {
    return (
      this.personForm.touched &&
      this.personForm.get('myValue')?.value !== 'some-value'
    );
  }

  private urlValidatorFn: ValidatorFn = control => {
    if (control.value === null || control.value === '') {
      return null;
    }
    if (this.myUrlRegex.test(control.value)) {
      return null;
    }
    return { url: 'Invalid URL.' };
  };
}
