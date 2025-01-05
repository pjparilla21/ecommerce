import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../../types/category';
import { Brand } from '../../../types/brand';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Router } from '@angular/router';
import e from 'cors';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="flex flex-col items-center px-10 md:px-40 mt-10">
      @if(id){
        <h1>Update Product</h1>
      }@else{
      <h1> Add Product</h1>
      }
      <h1 class="text-xl font-bold mb-4">Add New Product</h1>
      <form class="shadow-lg rounded-lg p-6 w-full max-w-2xl bg-white" [formGroup]="productForm">
        <div class="flex flex-wrap gap-4">
          <!-- Category -->
          <mat-form-field class="w-full">
            <mat-label>Category</mat-label>
            <mat-select formControlName="categoryId" multiple>
              <mat-option *ngFor="let item of categories" [value]="item._id">{{ item.name }}</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Brand -->
          <mat-form-field class="w-full">
            <mat-label>Brand</mat-label>
            <mat-select formControlName="brandId">
              <mat-option *ngFor="let item of brands" [value]="item._id">{{ item.name }}</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Name -->
          <mat-form-field class="w-full">
            <mat-label>Name</mat-label>
            <input matInput type="text" formControlName="name" />
          </mat-form-field>

          <!-- Short Description -->
          <mat-form-field class="w-full">
            <mat-label>Short Description</mat-label>
            <input matInput type="text" formControlName="shortDescription" />
          </mat-form-field>

          <!-- Description -->
          <mat-form-field class="w-full">
            <mat-label>Description</mat-label>
            <textarea matInput rows="3" formControlName="description"></textarea>
          </mat-form-field>

          <!-- Price -->
          <mat-form-field class="w-1/2">
            <mat-label>Price</mat-label>
            <input matInput type="number" formControlName="price" />
          </mat-form-field>

          <!-- Discount -->
          <mat-form-field class="w-1/2">
            <mat-label>Discount</mat-label>
            <input matInput type="number" formControlName="discount" />
          </mat-form-field>

          <!-- Is Featured -->
           <div class="w-full flex gap-8">
             <mat-checkbox formControlName="isFeatured" color="primary">Is Featured</mat-checkbox>
             <mat-checkbox formControlName="isNew" color="primary">Is New</mat-checkbox>

           </div>

          <!-- Images -->
          <div class="w-full">
            <h4 class="font-semibold">Images:</h4>
            <div class="flex flex-col gap-2" formArrayName="images">
              <div class="flex items-center gap-2" *ngFor="let item of images.controls; let i = index">
                <mat-form-field class="w-full">
                  <mat-label>Image {{ i + 1 }}</mat-label>
                  <input matInput type="text" [formControlName]="i" />
                </mat-form-field>
                <button mat-icon-button color="warn" (click)="removeImage(i)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
            <button mat-raised-button color="primary" class="mt-2" (click)="addImage()">Add Image</button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mt-6">
          @if(id){
            <button mat-raised-button color="primary" [disabled]="productForm.invalid" (click)="updateProduct(productForm.value)">Update Product</button>
          }@else {
            <button mat-raised-button color="primary" [disabled]="productForm.invalid" (click)="addProduct()">Add Product</button>
          }
          
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required, Validators.min(0)]],
    discount: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    images: this.formBuilder.array([]),
    categoryId: [null, Validators.required],
    brandId: [null, Validators.required],
    isFeatured: [false],
    isNew: [false],

  });

  categories: Category[] = [];
  brands: Brand[] = [];
  id!: string;
  route= inject(ActivatedRoute);
  ngOnInit() {
    this.addImage(); // Initialize with one image input
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
    this.brandService.getBrands().subscribe((data: Brand[]) => {
      this.brands = data;
    });

    this.id=this.route.snapshot.params["id"];
    console.log(this.id);
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((data) => {
        for (let i = 0; i < data.images.length; i++) {
          this.addImage();
        }
        this.productForm.patchValue(data as any);})
        
    }else{
    
    }
  }

  router=inject(Router);
  addProduct() {
    if (this.productForm.valid) {
      const value = this.productForm.value;
      console.log(value);
      this.productService.addProduct(value as any).subscribe((data) => {
        alert('Product added successfully:'); });
        this.router.navigate(['/admin/product']);
      // Add your logic to add the product here
    } else {
      console.error('Form is invalid');
    }
  }
  updateProduct(value: any) {
    if (this.productForm.value) {
      const product = this.productForm.value;
      console.log(value);
      this.productService.updateProduct(this.id, value).subscribe((data) => {
        alert('Product updated successfully:'); });
        this.router.navigate(['/admin/product']);
      // Add your logic to update the product here
    } else {
      console.error('Form is invalid');
    }
  }
  

  addImage() {
    this.images.push(this.formBuilder.control(''));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }
}
