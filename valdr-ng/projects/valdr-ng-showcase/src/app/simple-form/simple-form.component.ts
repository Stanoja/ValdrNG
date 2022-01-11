import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {
  private readonly myUrlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?$/;

  @Input() person: any;

  personForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      firstName: [this.person.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      username: [this.person.username, Validators.pattern('[a-zA-Z]{4,}')],
      email: [this.person.email, Validators.email],
      age: [this.person.age, [Validators.min(10), Validators.max(100)]],
      homepage: [this.person.homepage, [this.urlValidatorFn]],
      addressLine1: [this.person.addressLine1, [Validators.minLength(2), Validators.maxLength(20)]]
    });
  }

  isFirstNameInvalidInLength() {
    const firstName = this.personForm.get('firstName');
    return this.personForm.touched && firstName?.errors
      ? firstName.errors['minlength'] || firstName.errors['maxlength']
      : false;
  }

  isFirstNameInvalidInRequired() {
    const firstName = this.personForm.get('firstName');
    return this.personForm.touched && firstName?.errors ?firstName.errors['required'] : false;
  }

  isUsernameInvalid() {
    const username = this.personForm.get('username');
    return this.personForm.touched && username?.errors ? username.errors['pattern'] : false;
  }

  isEmailInvalid() {
    const email = this.personForm.get('email');
    return this.personForm.touched && email?.errors ? email.errors['email'] : false;
  }

  isMaxAgeInvalid() {
    const age = this.personForm.get('age');
    return this.personForm.touched && age?.errors ? age.errors['max'] : false;
  }

  isMinAgeInvalid() {
    const age = this.personForm.get('age');
    return this.personForm.touched && age?.errors ? age.errors['min'] : false;
  }

  isHomepageInvalid() {
    const homepage = this.personForm.get('homepage');
    return this.personForm.touched && homepage?.errors
      ? homepage.errors['url']
      : false;
  }

  isAddressLine1InvalidInMaxLength() {
    const maxLength = this.personForm.get('addressLine1');
    return this.personForm.touched && maxLength?.errors
      ? maxLength.errors['maxlength']
      : false;
  }

  isAddressLine1InvalidInMinLength() {
    const minLength = this.personForm.get('addressLine1');
    return this.personForm.touched && minLength?.errors
      ? minLength.errors['minlength']
      : false;
  }


  private urlValidatorFn: ValidatorFn = control => {
    if (control.value === null || control.value === '') {
      return null;
    }
    if (this.myUrlRegex.test(control.value)) {
      return null;
    }
    return {url: 'Invalid URL.'};
  }

}
