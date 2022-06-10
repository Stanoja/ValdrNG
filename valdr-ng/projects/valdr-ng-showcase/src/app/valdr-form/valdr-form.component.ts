import {Component, Input, OnInit} from '@angular/core';
import {ValdrNgService} from '../../../../valdr-ng/src/lib/valdr-ng.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-valdr-form',
  templateUrl: './valdr-form.component.html',
  styleUrls: ['./valdr-form.component.scss']
})
export class ValdrFormComponent implements OnInit {

  @Input() person: any;
  personForm!: FormGroup;

  constructor(private valdrNgService: ValdrNgService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const controls = this.valdrNgService.createFormGroupControls(this.person, 'Person');
    this.personForm = this.fb.group(controls);

    this.personForm.get('firstName')?.valueChanges.subscribe(name => {
      console.log('manual name validation', this.valdrNgService.validate('Person', 'firstName', name));
    })
  }

}
