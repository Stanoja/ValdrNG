import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ValdrErrorComponent} from './valdr-error.component';

describe('ValdrErrorComponent', () => {
  let component: ValdrErrorComponent;
  let fixture: ComponentFixture<ValdrErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValdrErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValdrErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
