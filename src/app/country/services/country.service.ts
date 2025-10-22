import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mappers';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  serchByCapital(query: string) {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountries(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((err) => {
        return throwError(
          () => new Error(`No se pudo obtener paises con el query: ${query}`)
        );
      })
    );
  }

  serchByCountry(query: string) {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query));
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountries(resp)),
      tap((resp) => this.queryCacheCountry.set(query, resp)),
      catchError((err) => {
        return throwError(
          () => new Error(`No se pudo obtener paises con el query: ${query}`)
        );
      })
    );
  }

  serchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountries(resp)),
      map((countries) => countries.at(0)),
      catchError((err) => {
        return throwError(
          () =>
            new Error(`No se pudo obtener el país con el alpha code: ${code}`)
        );
      })
    );
  }

  serchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheCountry.has(region)) {
      return of(this.queryCacheRegion.get(region));
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => resp.filter((country) => country.region === region)),
      map((resp) => CountryMapper.mapRestCountryToCountries(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((err) => {
        return throwError(
          () => new Error(`No se pudo obtener paises con el query: ${region}`)
        );
      })
    );
  }
}
