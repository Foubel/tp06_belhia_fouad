import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recherche-produits',
  templateUrl: './recherche-produits.component.html',
  styleUrls: ['./recherche-produits.component.css']
})
export class RechercheProduitsComponent {
  @Output() searchEvent = new EventEmitter<any>();

  searchTerms = {
    id: '',
    name: '',
    description: '',
    price: ''
  };

  search() {
    this.searchEvent.emit(this.searchTerms);
  }

  resetFilters() {
    this.searchTerms = { id: '', name: '', description: '', price: '' };
    this.searchEvent.emit(this.searchTerms);
  }
}
