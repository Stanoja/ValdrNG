import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'valdr-ng-showcase';

  person = {
    firstName: 'John',
    username: '',
    email: '',
    age: null,
    homepage: null,
    addressLine1: 'My Address',
    myValue: ''
  };

}
