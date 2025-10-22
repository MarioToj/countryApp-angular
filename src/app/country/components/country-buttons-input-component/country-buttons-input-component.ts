import { Component, output, signal } from '@angular/core';
import { Region } from '../../interfaces/region.interface';

@Component({
  selector: 'app-country-buttons-input-component',
  imports: [],
  templateUrl: './country-buttons-input-component.html',
})
export class CountryButtonsInputComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  regionInput = output<Region>();

  selectedRegion = signal<Region | null>('Africa');
}
