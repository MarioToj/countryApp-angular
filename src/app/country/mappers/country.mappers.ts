import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      capital: restCountry.capital[0],
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
      area: restCountry.area,
      coatOfArms: restCountry.coatOfArms.png,
      borders: restCountry.borders?.join(', '),
    };
  }

  static mapRestCountryToCountries(restCountry: RESTCountry[]): Country[] {
    return restCountry.map((countries) =>
      this.mapRestCountryToCountry(countries)
    );
  }
}
