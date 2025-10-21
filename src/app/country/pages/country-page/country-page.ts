import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-page',
  imports: [],
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
