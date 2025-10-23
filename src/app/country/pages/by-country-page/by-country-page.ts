import { Component, inject, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input-component/country-search-input-component';
import { CountryListComponent } from '../../components/country-list-component/country-list-component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  routes = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal<string>(this.queryParam);

  countryResource = rxResource({
    // Ingresamos la query que viene desde el output del componente hijo
    request: () => ({ query: this.query() }),
    // se desestructura la request anterior que contiene el valor de la query
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.routes.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        },
      });
      // se retorna el primer valor obtenido
      return this.countryService.serchByCountry(request.query);
    },
  });
}
