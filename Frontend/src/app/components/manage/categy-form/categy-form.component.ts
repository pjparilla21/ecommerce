import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service'; // Update the path as necessary
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category'; // Update the path as necessary
@Component({
  selector: 'app-categy-form',
  imports: [FormsModule, CommonModule],
  template: `
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <!-- Conditional Heading -->
      <h1 *ngIf="isEdit" class="text-3xl font-semibold text-center text-gray-800 mb-6">
        <i class="material-icons align-middle mr-2">update</i> Update Category
      </h1>
      <h1 *ngIf="!isEdit" class="text-3xl font-semibold text-center text-gray-800 mb-6">
        <i class="material-icons align-middle mr-2">add_circle</i> Add Category
      </h1>

      <!-- Edit Form -->
      <form *ngIf="isEdit" (ngSubmit)="onUpdate()" class="space-y-4">
        <div>
          <label for="categoryName" class="block text-gray-700 font-medium">Category Name</label>
          <input id="categoryName" type="text" class="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name" [(ngModel)]="categoryName" name="categoryName" required />
        </div>
        <div class="text-center">
          <button type="submit" class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update
          </button>
        </div>
      </form>

      <!-- Add Form -->
      <form *ngIf="!isEdit" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label for="categoryName" class="block text-gray-700 font-medium">Category Name</label>
          <input id="categoryName" type="text" class="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name" [(ngModel)]="categoryName" name="categoryName" required />
        </div>
        <div class="text-center">
          <button type="submit" class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>`,

  styleUrls: ['./categy-form.component.scss'],
})
export class CategyFormComponent {
  categoryName!: string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false; // flag to determine if we are editing an existing category
  id!: string;

  // On component initialization
  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? idParam : '';
    console.log('Category ID:', this.id);
    
    // If an ID exists, it's an edit scenario
    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((data: any) => {        
        console.log(data);
        this.categoryName = data.name; // Set category name for editing
      });
    }
  }

  // Add category
  onSubmit() {
    console.log('Category Name:', this.categoryName);
    this.categoryService.addCategory(this.categoryName).subscribe((data) => {
      console.log('Category added successfully:', data);
      this.router.navigate(['/admin/categories']); // Redirect after adding
    });
  }

  // Update category
  onUpdate() {
    console.log('Updating Category with ID:', this.id, 'Category Name:', this.categoryName);
    this.categoryService.updateCategory(this.id, this.categoryName).subscribe((data) => {
      console.log('Category updated successfully:', data);
      this.router.navigate(['/admin/categories']); // Redirect after updating
    });
  }
}
