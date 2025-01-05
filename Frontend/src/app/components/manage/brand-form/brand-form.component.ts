import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../../services/brand.service'; // Update the path as necessary
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Brand } from '../../../types/brand'; // Update the path as necessary
import Swal from 'sweetalert2'; // For displaying success/error messages

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, CommonModule],
  template: `
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <!-- Conditional Heading -->
      <h1 *ngIf="isEdit" class="text-3xl font-semibold text-center text-gray-800 mb-6">
        <i class="material-icons align-middle mr-2">update</i> Update Brand
      </h1>
      <h1 *ngIf="!isEdit" class="text-3xl font-semibold text-center text-gray-800 mb-6">
        <i class="material-icons align-middle mr-2">add_circle</i> Add Brand
      </h1>

      <!-- Edit Form -->
      <form *ngIf="isEdit" (ngSubmit)="onUpdate()" class="space-y-4">
        <div>
          <label for="brandName" class="block text-gray-700 font-medium">Brand Name</label>
          <input id="brandName" type="text" class="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter brand name" [(ngModel)]="brandName" name="brandName" required />
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
          <label for="brandName" class="block text-gray-700 font-medium">Brand Name</label>
          <input id="brandName" type="text" class="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter brand name" [(ngModel)]="brandName" name="brandName" required />
        </div>
        <div class="text-center">
          <button type="submit" class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>`,

  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent {
  brandName!: string;
  brandService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false; // flag to determine if we are editing an existing brand
  id!: string;

  // On component initialization
  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = idParam;
      this.isEdit = true;
      this.brandService.getBrand(this.id).subscribe(
        (data: any) => {
          this.brandName = data.name; // Set brand name for editing
        },
        (error) => {
          Swal.fire('Error', 'Failed to load brand details', 'error');
        }
      );
    }
  }

  // Add brand
  onSubmit() {
    this.brandService.addBrand(this.brandName).subscribe(
      (data) => {
        Swal.fire('Success', 'Brand added successfully!', 'success');
        this.router.navigateByUrl('/admin/brands');
      },
      (error) => {
        Swal.fire('Error', 'Failed to add brand', 'error');
      }
    );
  }

  // Update brand
  onUpdate() {
    this.brandService.updateBrand(this.id, this.brandName).subscribe(
      (data) => {
        Swal.fire('Success', 'Brand updated successfully!', 'success');
        this.router.navigateByUrl('/admin/brands');
      },
      (error) => {
        Swal.fire('Error', 'Failed to update brand', 'error');
      }
    );
  }
}
