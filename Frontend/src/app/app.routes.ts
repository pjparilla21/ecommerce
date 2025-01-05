import { Routes } from '@angular/router';
import { CategyFormComponent } from './components/manage/categy-form/categy-form.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
export const routes: Routes = [
{
    path: '',
    component: HomeComponent
},
{
    path: 'admin/categories',
    component: CategoriesComponent
},
{
    path: 'admin/categories/add',
    component: CategyFormComponent
}, {
    path: 'admin/categories/:id',
    component: CategyFormComponent
},
{
    path: 'admin/brands',
    component: BrandsComponent
},
{
    path: 'admin/brands/add',
    component: BrandFormComponent
}, {
    path: 'admin/brands/:id',
    component: BrandFormComponent
},

{
    path: 'admin/product',
    component: ProductsComponent
},
{
    path: 'admin/product-form/add',
    component: ProductFormComponent
}, {
    path: 'admin/product-form/:id',
    component: ProductFormComponent
},
{
    path: "products",
    component: ProductListComponent
},
{
    path: "product/:id",
    component: ProductDetailComponent
}


];
