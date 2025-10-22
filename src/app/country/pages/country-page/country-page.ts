import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { SharedNotFound } from '../../../shared/components/shared-not-found/shared-not-found';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'country-page',
  imports: [SharedNotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.serchCountryByAlphaCode(request.code);
    },
  });
}
