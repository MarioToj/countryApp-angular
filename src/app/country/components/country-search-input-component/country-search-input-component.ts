import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input-component',
  imports: [],
  templateUrl: './country-search-input-component.html',
})
export class CountrySearchInputComponent {
  searchValue = output<string>();
  placeholder = input.required<string>();

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
