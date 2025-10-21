import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { CountrySearchInputComponent } from "../../components/country-search-input-component/country-search-input-component";
import { CountryListComponent } from "../../components/country-list-component/country-list-component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {
  countryService = inject(CountryService);

  query = signal<string>('');

    countryResource = rxResource({
    // Ingresamos la query que viene desde el output del componente hijo
    request: () => ({ query: this.query()}),
    // se desestructura la request anterior que contiene el valor de la query
    loader: ({ request }) => {
      if(!request.query) return of([]);
      // se retorna el primer valor obtenido 
      return this.countryService.serchByCapital(request.query);
    } 
  })

  // countryResource = resource({
  //   // Ingresamos la query que viene desde el output del componente hijo
  //   request: () => ({ query: this.query()}),
  //   // se desestructura la request anterior que contiene el valor de la query
  //   loader: async ({ request}) => {
  //     if(!request.query) return [];
  //     // se retorna el primer valor obtenido 
  //     return await firstValueFrom(
  //       this.countryService.serchByCapital(request.query),
  //     )
  //   } 
  // })

  // isLoading = signal<boolean>(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearchValue(value: string) {
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.serchByCapital(value).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //       console.log(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   })
  // }

}
