import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { AddToCart, RemoveFromCart } from '../panier/panier.state';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit {
  produits$!: Observable<any[]>; // Observable pour les produits
  searchTerms: any = {}; // Stockez les termes de recherche ici

  constructor(private http: HttpClient, private store: Store, private authService: AuthService) { }

  ngOnInit(): void {
    this.produits$ = this.getProducts().pipe(
      map(products => this.filterProducts(products, this.searchTerms))
    );
  }

  getProducts(): Observable<any[]> {
    const jwtToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });

    return this.http.get<any[]>(environment.backendCatalogue, { headers });
  }

  applyFilters(searchTerms: any): void {
    this.searchTerms = searchTerms;
    this.produits$ = this.getProducts().pipe(
      map(products => this.filterProducts(products, searchTerms))
    );
  }

  filterProducts(products: any[], searchTerms: any): any[] {
    // Implémentez ici la logique de filtrage basée sur searchTerms
    return products.filter(product => {
      return (!searchTerms.id || product.id.toString().includes(searchTerms.id)) &&
             (!searchTerms.name || product.name.toLowerCase().includes(searchTerms.name.toLowerCase())) &&
             (!searchTerms.description || product.description.toLowerCase().includes(searchTerms.description.toLowerCase())) &&
             (!searchTerms.price || product.price.toString().includes(searchTerms.price));
    });
  }

  addToCart(product: any): void {
    this.store.dispatch(new AddToCart(product));
  }

  removeFromCart(id: number): void {
    this.store.dispatch(new RemoveFromCart(id));
  }
}
