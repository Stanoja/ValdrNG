import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValdrConstraints} from "../../../valdr-ng/src/lib/model";
import {ValdrNgService} from "../../../valdr-ng/src/lib/valdr-ng.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'valrd-ng-showcase';

  personForm!: FormGroup;
  personFormWithValrd!: FormGroup;

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
      }
    }
  };

  private person = {
    firstName: 'John'
  };

  constructor(private valdrService: ValdrNgService,
              private fb: FormBuilder) {
    valdrService.setConstraints(this.constraints);
  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
    const controls = this.valdrService.createFormGroupControls(this.person, 'Person');
    this.personFormWithValrd = this.fb.group(controls);
  }

  isFirstNameInvalidInLength() {
    return this.personForm.touched &&  this.firstNameControl?.errors ? this.firstNameControl.errors['minlength']
      || this.firstNameControl.errors['maxlength'] : false;
  }

  isFirstNameInvalidInRequired() {
    return this.personForm.touched && this.firstNameControl?.errors ? this.firstNameControl.errors['required'] : false;
  }

  get firstNameControl() {
    return this.personForm.get('firstName');
  }
}
