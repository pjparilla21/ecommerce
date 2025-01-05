import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/categories'; // Define the base URL for your API

  http = inject(HttpClient); // Inject HttpClient
  constructor() {}

  // Get all categories
  getCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Get a single category by ID
  getCategoryById(id: string) {
    return this.http.get<Category[]>(`${this.apiUrl}/${id}`);
  }

  // Add a new category
  addCategory(name: string) {
    return this.http.post(this.apiUrl, { name });
  }

  // Update category by ID
  updateCategory(id: string, name: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { name });  // Use PUT for update
  }
  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
