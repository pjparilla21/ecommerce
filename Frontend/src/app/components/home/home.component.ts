import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, CommonModule,RouterLink],
  standalone: true,
  template: `
    <!-- Carousel -->
    <div class="relative w-full max-w-9x3 mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        class="flex transition-transform duration-1000 ease-in-out"
        [style.transform]="'translateX(-' + (activeIndex * 100) + '%)'"
      >
        <div
          *ngFor="let slide of slides; let i = index"
          class="w-full flex-shrink-0 grid grid-cols-3 gap-4"
        >
          <div *ngFor="let product of slide" class="w-full" [routerLink]="'product/' + product._id">
            <img
              [src]="product.images[0]"
              alt="Product Image"
              class="w-full h-[400px] object-cover rounded-lg carousel-image"
              />
            <div class="p-4">
              <h2 class="text-lg font-bold">{{ product.name }}</h2>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <button
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
        (click)="prevSlide()"
      >
        &#8592;
      </button>
      <button
        class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
        (click)="nextSlide()"
      >
        &#8594;
      </button>

      <!-- Indicators -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div
          *ngFor="let slide of slides; let i = index"
          class="w-3 h-3 rounded-full bg-gray-300"
          [class.bg-gray-800]="i === activeIndex"
        ></div>
      </div>
    </div>

     <!-- Featured Products Section -->
     <h4 class="text-3xl font-bold text-center mb-8 text-gray-800 mt-12">Featured Products</h4>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <div *ngFor="let product of featuredProducts" class="p-4">
        <app-product-card [product]="product"></app-product-card>
      </div>
    </div>

    <!-- New Products Section -->
    <h4 class="text-3xl font-bold text-center mb-8 text-gray-800">New Products</h4>
    <div class="flex flex-wrap justify-center gap-8">
      <div *ngFor="let product of newProducts" class="w-full sm:w-5/12 md:w-3/12 lg:w-3/12 p-4">
        <app-product-card [product]="product"></app-product-card>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  slides: Product[][] = [];
  activeIndex = 0;
  autoPlayInterval: any;

  ngOnInit(): void {
    this.customerService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.slides = this.chunkArray(this.featuredProducts, 3); // Create 3-grid slides
      },
      error: (err) => console.error('Error fetching featured products:', err),
    });

    this.customerService.getNewProducts().subscribe({
      next: (products) => {
        this.newProducts = products;
      },
      error: (err) => console.error('Error fetching new products:', err),
    });

    this.startAutoPlay();
  }

  nextSlide(): void {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.slides.length) % this.slides.length;
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.autoPlayInterval);
  }

  private chunkArray(arr: Product[], size: number): Product[][] {
    const chunks: Product[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
}
