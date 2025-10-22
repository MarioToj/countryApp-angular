import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list-component/country-list-component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Region } from '../../interfaces/region.interface';
import { CountryButtonsInputComponent } from '../../components/country-buttons-input-component/country-buttons-input-component';

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, CountryButtonsInputComponent],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  countryService = inject(CountryService);

  region = signal<Region>('Africa');

  countryResource = rxResource({
    request: () => ({ region: this.region() }),
    loader: ({ request }) => {
      return this.countryService.serchByRegion(request.region);
    },
  });
}
