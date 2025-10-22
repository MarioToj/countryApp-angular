import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'shared-not-found',
  imports: [],
  templateUrl: './shared-not-found.html',
})
export class SharedNotFound {
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
