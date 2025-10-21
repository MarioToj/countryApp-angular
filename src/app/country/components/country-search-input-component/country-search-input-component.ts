import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input-component',
  imports: [],
  templateUrl: './country-search-input-component.html',
})
export class CountrySearchInputComponent { 

  searchValue = output<string>();
  placeholder = input.required<string>();

}
