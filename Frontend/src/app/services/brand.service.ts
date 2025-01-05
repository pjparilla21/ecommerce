import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../types/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

 private apiUrl = 'http://localhost:5000/brands'; 
 
   http = inject(HttpClient); // Inject HttpClient
   constructor() {}
 
   // Get all categories
   getBrands() {
     return this.http.get<Brand[]>(this.apiUrl);
   }
 
   // Get a single Brand by ID
   getBrand(id: string) {
     return this.http.get<Brand[]>(`${this.apiUrl}/${id}`);
   }
 
   // Add a new Brand
   addBrand(name: string) {
     return this.http.post(this.apiUrl, { name });
   }
 
   // Update Brand by ID
   updateBrand(id: string, name: string) {
     return this.http.put(`${this.apiUrl}/${id}`, { name });  // Use PUT for update
   }
   deleteBrand(id: string) {
     return this.http.delete(`${this.apiUrl}/${id}`);
   }
 }

