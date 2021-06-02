import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  { path:'edit-product', component: EditProductComponent },
  { path:'', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,FormsModule]
})
export class AppRoutingModule { }
