import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product'; // Importing the Product interface

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products'; // Define the base URL for your API

  http = inject(HttpClient); // Inject HttpClient

  constructor() {}

  // Get all products
  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Get a single product by ID
  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Add a new product
  addProduct(product: Omit<Product, '_id'>) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Update product by ID
  updateProduct(id: string, product: Omit<Product, '_id'>) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
