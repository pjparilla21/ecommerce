import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Brand } from '../../../types/brand';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BrandFormComponent } from '../brand-form/brand-form.component';

@Component({
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule],

  template: `
   <div class="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-800">Manage Brands</h1>
    
    <!-- Add Brand Button with Material Icon -->
    <button 
      class="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-200"
      style="font-weight: 600; letter-spacing: 0.5px;"
      [routerLink]="['/admin/brands/add']" 
      routerLinkActive="router-link-active">
      <i class="material-icons">add_circle</i> Add Brand
    </button>
  </div>

  <!-- Search Input -->
  <div class="mb-6 flex items-center">
    <input 
      matInput
      (keyup)="applyFilter($event)"
      placeholder="Search Brands"
      class="w-full max-w-lg p-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-gray-500 text-gray-700" />
  </div>

  <!-- Table -->
  <div class="overflow-x-auto bg-white shadow-lg rounded-lg p-4" stye="width: 1800px;">
    <table mat-table [dataSource]="dataSource" class="min-w-full" stye="width: 1800px;">
      <!-- ID Column -->
      <ng-container matColumnDef="_id">
        <th mat-header-cell *matHeaderCellDef class="py-3 px-4 text-left text-gray-700 font-medium">ID</th>
        <td mat-cell *matCellDef="let element" class="py-3 px-4 text-gray-600">{{element._id}}</td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef class="py-3 px-4 text-left text-gray-700 font-medium">Name</th>
        <td mat-cell *matCellDef="let element" class="py-3 px-4 text-gray-600">{{element.name}}</td>
      </ng-container>

      <!-- Action Column -->
      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef class="py-3 px-4 text-left text-gray-700 font-medium">Action</th>
        <td mat-cell *matCellDef="let element" class="py-3 px-4 text-gray-600 ">
          <!-- Edit Button -->
          <button 
            class="text-blue-500 hover:text-blue-700 focus:outline-none"
            [routerLink]="['/admin/brands', element._id]">
            <mat-icon>edit</mat-icon>
          </button>
          
          <!-- Delete Button -->
          <button 
            class="text-red-500 hover:text-red-700 focus:outline-none"
            (click)="delete(element._id)">
            <mat-icon>delete</mat-icon>
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
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource<Brand>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  brandService = inject(BrandService);
  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(): void {
    this.getServerData();
  }

  private getServerData(): void {
    this.brandService.getBrands().subscribe((result) => {
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
      text: 'Do you really want to delete this brand?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.deleteBrand(id).subscribe(() => {
          this.getServerData(); // Refresh the brand list
          Swal.fire({
            icon: 'success',
            title: 'Successfully Deleted',
            text: 'The brand has been deleted successfully!',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }

  openAddBrandDialog(): void {
    const dialogRef = this.dialog.open(BrandFormComponent, {
      data: {} // No data passed for a new brand
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getServerData(); // Refresh the brand list after add/edit
      }
    });
  }

  openEditBrandDialog(brand: Brand): void {
    const dialogRef = this.dialog.open(BrandFormComponent, {
      data: { brand } // Pass brand data to be edited
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getServerData(); // Refresh the brand list after edit
      }
    });
  }
}