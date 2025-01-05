import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:5000/customer'; // Use environment files for better flexibility
  private http = inject(HttpClient);

  constructor() {}

  // Fetch new products
  getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/new-products`).pipe(
      catchError((error) => {
        console.error('Error fetching new products:', error);
        throw error; // Rethrow or return a fallback
      })
    );
  }

  // Fetch featured products
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/featured-products`).pipe(
      catchError((error) => {
        console.error('Error fetching featured products:', error);
        throw error; // Rethrow or return a fallback
      })
    );
  }
}
