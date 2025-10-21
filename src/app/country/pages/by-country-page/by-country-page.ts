import { Component } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input-component/country-search-input-component";
import { CountryListComponent } from "../../components/country-list-component/country-list-component";

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage { 

  onSearchValue(value: string) {
    console.log(value);
  }
}
