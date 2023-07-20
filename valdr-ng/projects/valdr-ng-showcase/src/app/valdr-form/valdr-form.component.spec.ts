import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValdrFormComponent } from './valdr-form.component';
import {
  ValdrNgModule,
  ValdrNgService,
} from '../../../../valdr-ng/src/public-api';
import constraints from '../../assets/constraints.json';
import { Person } from '../model/person';

describe('ValdrFormComponent', () => {
  let component: ValdrFormComponent;
  let fixture: ComponentFixture<ValdrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValdrFormComponent],
      imports: [ValdrNgModule.forRoot([])],
    }).compileComponents();
    const valdrNgService = TestBed.inject(ValdrNgService);
    valdrNgService.setConstraints(constraints);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValdrFormComponent);
    component = fixture.componentInstance;
    component.person = {} as Person;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
