import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] =[];
  selectedProduct: Product ={};

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
      this.productService.getProducts().subscribe((data)=>{
        this.products = data;
      });
  }

  onUpdate(productId?: any): void {
   this.router.navigate(['/edit-product'], {queryParams: { productId: productId }});
  }

  onDelete(productId: any): void {
    this.productService.deleteProduct(productId).subscribe((data)=>{
      console.log(data);
      this.products = this.products.filter(x=>x.id != productId);
    })
  }
}
