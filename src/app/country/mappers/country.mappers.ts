import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2 ?? '',
      flag: restCountry.flag ?? '',
      flagSvg: restCountry.flags?.svg ?? '',
      name:
        restCountry.translations['spa'].common ??
        restCountry.name?.common ??
        'Sin nombre',
      capital: restCountry.capital?.[0] ?? 'Sin capital',
      population: restCountry.population ?? 0,
      region: restCountry.region ?? 'Sin región',
      subregion: restCountry.subregion ?? 'Sin subregión',
      area: restCountry.area ?? 0,
      coatOfArms: restCountry.coatOfArms?.png ?? '',
      borders: restCountry.borders?.join(', ') ?? 'Sin fronteras',
    };
  }

  static mapRestCountryToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map((country) =>
      this.mapRestCountryToCountry(country)
    );
  }
}
