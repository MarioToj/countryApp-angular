import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input-component/country-search-input-component";
import { CountryListComponent } from "../../components/country-list-component/country-list-component";

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {

  onSearchValue(value: string) {
    console.log(value);
  }

}
