import { Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Person } from './model/person';

@Component({ selector: 'app-simple-form', template: '', standalone: false })
class SimpleFormStubComponent {
  @Input() person: Person | undefined;
}

@Component({ selector: 'app-valdr-form', template: '', standalone: false })
class ValdrFormStubComponent {
  @Input() person: Person | undefined;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SimpleFormStubComponent,
        ValdrFormStubComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
