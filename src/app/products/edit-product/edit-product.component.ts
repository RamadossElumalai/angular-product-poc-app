import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = {};
  categories: Category[] = [];
  title: string = "Add Product";

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    this.categories = [
      {"name":"Electornics", "value":"electornics"},
      {"name":"Accessories", "value":"accessories"},
      {"name":"Home Appliances", "value":"homeappliances"},
    ]

    this.route.queryParams
      .subscribe(params => {
        if(params.productId) {
          this.productService.getProduct(params.productId).subscribe((data)=>{
            this.product = data;
            this.title = "Update Product";
          })
        }
      }
    );

  }

  updateProduct(form: NgForm) {
    this.productService.addOrUpdateProduct(form.value).subscribe((data)=>{
      alert("data save successfully");
      this.goToHomePage();
    });
  }

  goToHomePage() {
    this.router.navigate(['']);
  }
}
