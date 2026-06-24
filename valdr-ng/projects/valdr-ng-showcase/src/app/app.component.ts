import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Person } from './model/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  title = 'valdr-ng-showcase';

  person: Person = {
    firstName: 'John',
    username: '',
    email: '',
    age: null,
    homepage: null,
    addressLine1: 'My Address',
    myValue: '',
  };
}
