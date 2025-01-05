import { Component,inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categoryService= inject (CategoryService);
  categoryList:Category[]=[];
  ngOnInit(): void {
    
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categoryList = data;
    });


 
  }
  
  router=inject(Router)
  onSearch(event: any) {
    // Your code here
    if (event.target.value) {
      this.router.navigateByUrl("/products?search=" + event.target.value);
    }
  }
  searchCategory(id: string) {
    this.router.navigateByUrl("/products?categoryId=" + id);
  }
}
