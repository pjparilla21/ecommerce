import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../types/product';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  providers: [CurrencyPipe],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule],
  template: `
    <div class="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <!-- Title -->
        <h1 class="text-3xl font-semibold text-gray-900">Manage Products</h1>

        <!-- Add Product Button -->
        <button 
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          [routerLink]="['/admin/product-form/add']" 
          routerLinkActive="router-link-active">
          <i class="material-icons text-lg">add_circle</i>
          <span class="font-medium">Add Product</span>
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative mb-6">
        <input 
          matInput
          (keyup)="applyFilter($event)"
          placeholder="Search products..."
          class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
        <i class="material-icons absolute left-3 top-3 text-gray-400">search</i>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table mat-table [dataSource]="dataSource" class="min-w-full bg-white">
          <!-- ID Column -->
          <ng-container matColumnDef="_id">
            <th mat-header-cell *matHeaderCellDef class="py-4 px-6 text-left text-gray-700 font-medium">ID</th>
            <td mat-cell *matCellDef="let element" class="py-4 px-6 text-gray-600">{{element._id}}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef class="py-4 px-6 text-left text-gray-700 font-medium">Product Name</th>
            <td mat-cell *matCellDef="let element" class="py-4 px-6 text-gray-600">{{element.name}}</td>
          </ng-container>

          <!-- Short Description Column -->
          <ng-container matColumnDef="shortDescription">
            <th mat-header-cell *matHeaderCellDef class="py-4 px-6 text-left text-gray-700 font-medium">Short Description</th>
            <td mat-cell *matCellDef="let element" class="py-4 px-6 text-gray-600">{{element.shortDescription}}</td>
          </ng-container>

          <!-- Description Column -->
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef class="py-4 px-6 text-left text-gray-700 font-medium">Description</th>
            <td mat-cell *matCellDef="let element" class="py-4 px-6 text-gray-600">{{element.description}}</td>
          </ng-container>

            <!-- Price Column -->
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef class="py-3 px-4 text-left text-gray-700 font-medium">Price</th>
            <td mat-cell *matCellDef="let product" class="py-3 px-4 text-gray-600">
              {{ product.price }}
            </td>
          </ng-container>

          <!-- Discount Column -->
          <ng-container matColumnDef="discount">
            <th mat-header-cell *matHeaderCellDef class="py-4 px-6 text-left text-gray-700 font-medium">Discount</th>
            <td mat-cell *matCellDef="let product" class="py-4 px-6 text-gray-600">
              {{ product.discount }}
            </td>
          </ng-container>

          <!-- Images Column -->
          <ng-container matColumnDef="images">
            <th mat-header-cell *matHeaderCellDef class="py-4 px-6 text-left text-gray-700 font-medium">Images</th>
            <td mat-cell *matCellDef="let element" class="py-4 px-6 text-gray-600">{{element.images}}</td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef class="py-4 px-6 text-left text-gray-700 font-medium">Actions</th>
            <td mat-cell *matCellDef="let element" class="py-4 px-6 ">
              <!-- Edit Button -->
              <button 
                class="flex items-center gap-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                [routerLink]="['/admin/product-form/', element._id]">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
              </button>
              
              <!-- Delete Button -->
              <button 
                class="flex items-center gap-1 text-red-500 hover:text-red-700 focus:outline-none"
                (click)="delete(element._id)">
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>

      <!-- Paginator -->
      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons class="mt-6"></mat-paginator>
    </div>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'shortDescription', 'description', 'price', 'discount', 'images', 'action'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productService = inject(ProductService);

  constructor(private dialog: MatDialog, private currencyPipe: CurrencyPipe) {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(): void {
    this.getServerData();
  }

  private getServerData(): void {
    this.productService.getProducts().subscribe((result) => {
      console.log(result);
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.getServerData(); // Refresh the product list
          Swal.fire({
            icon: 'success',
            title: 'Successfully Deleted',
            text: 'The product has been deleted successfully!',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }
}
