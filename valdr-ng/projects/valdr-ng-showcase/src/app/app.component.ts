import {Component} from '@angular/core';
import {ValdrConstraints} from '../../../valdr-ng/src/lib/model';
import {ValdrNgService} from '../../../valdr-ng/src/lib/valdr-ng.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'valdr-ng-showcase';

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
      },
      'username': {
        'pattern': {
          'value': '[a-zA-Z]{4,}',
          'message': 'Usename must be longer than 4 characters and match \'a-zA-Z\'.'
        }
      },
      'email': {
        'email': {
          'message': 'Invalid email.'
        }
      },
      'age': {
        'min': {
          'value': 10,
          'inclusive': true,
          'message': 'Age should be greater or equal to 10.'
        },
        'max': {
          'value': 100,
          'message': 'Age should be less than or equal to 100.'
        },
      },
      'homepage': {
        'url': {
          'message': 'Invalid URL.'
        }
      },
      'addressLine1': {
        'minLength': {
          'number': 2,
          'message': 'Address should be longer than 2 characters.'
        },
        'maxLength': {
          'number': 20,
          'message': 'Address should be shorter than 20 characters.'
        }
      }
    }
  };

  person = {
    firstName: 'John',
    username: '',
    email: '',
    age: null,
    homepage: null,
    addressLine1: 'My Address'
  };

  constructor(private valdrNgService: ValdrNgService) {
    valdrNgService.setConstraints(this.constraints);
  }

}
