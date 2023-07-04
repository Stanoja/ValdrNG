import { Component, Input, OnInit } from '@angular/core';
import { ValdrNgService } from '../../../../valdr-ng/src/lib/valdr-ng.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Person } from '../model/person';

@Component({
  selector: 'app-valdr-form',
  templateUrl: './valdr-form.component.html',
  styleUrls: ['./valdr-form.component.scss'],
})
export class ValdrFormComponent implements OnInit {
  @Input() person: Person;
  personForm!: FormGroup;

  output: string = '';

  constructor(
    private valdrNgService: ValdrNgService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const controls = this.valdrNgService.createFormGroupControls(
      this.person!,
      'Person'
    );
    this.personForm = this.fb.group(controls);

    // This shows how one can use valdrNg to directly validate a value without using a form.
    this.personForm.get('firstName')?.valueChanges.subscribe(name => {
      this.output = JSON.stringify(
        this.valdrNgService.validate('Person', 'firstName', name),
        null,
        2
      );
    });
  }
}
