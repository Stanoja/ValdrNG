import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValdrFormComponent } from './valdr-form.component';

describe('ValdrFormComponent', () => {
  let component: ValdrFormComponent;
  let fixture: ComponentFixture<ValdrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValdrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValdrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
