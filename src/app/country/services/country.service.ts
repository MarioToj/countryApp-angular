import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mappers';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  serchByCapital(query: string) {
    query = query.toLocaleLowerCase()
     
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountries(resp)),
        catchError((err) => {
          console.log('error fetching: ', err);
          return throwError(() => new Error(`No se pudo obtener paises con el query: ${ query }` ))
        })
      );
  }

  serchByCountry(query: string) {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountries(resp)),
        catchError((err) => {
          console.log('error fetching: ', err);
          return throwError(() => new Error(`No se pudo obtener paises con el query: ${ query }` ))
        })
      )
  }

    serchCountryByAlphaCode(code: string) {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryToCountries(resp)),
        map((countries) => countries.at(0)),
        catchError((err) => {
          console.log('error fetching: ', err);
          return throwError(() => new Error(`No se pudo obtener el país con el alpha code: ${ code }` ))
        })
      )
  }
}
