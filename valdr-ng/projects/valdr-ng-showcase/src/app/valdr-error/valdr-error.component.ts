import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-valdr-error',
  templateUrl: './valdr-error.component.html',
  styleUrls: ['./valdr-error.component.scss']
})
export class ValdrErrorComponent {

  @Input() control: AbstractControl | null = null;

  isInvalid(): boolean {
    return !!this.control?.errors && this.control.touched;
  }

  get errorMessages(): string[] {
    if (!this.control?.errors) {
      return [];
    }
    return Object.values(this.control.errors).map(err => err.message);
  }
}
