import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { By } from '@angular/platform-browser';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService; 

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule], 
      providers: [ ProductService]
    })
    .compileComponents();
    productService=TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should be initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });

  it('header value should be present',()=>{
    const header = fixture.debugElement.query(By.css('h1')).nativeElement.innerHTML;
    expect(header).toBe("Product List");
  });

  it(`should not have any product in list before ngOnInit`, () => {
    expect(component.products.length).toBe(0, 'product list is empty before init');
  });

  it(`should get the product list after ngOnInit`, async() => {
    let products: Product[] = [
      {"id":1,"name":"Laptop", "category":"electornics","description":"note book hp laptop", "amount": "50000"},
      {"id":2,"name":"Nokia 1100", "category":"electornics","description":"basic mobile", "amount": "1200"},
    ];
    spyOn(productService, 'getProducts').and.returnValue(of(products));
    component.ngOnInit();
    await fixture.whenStable().then(()=>{
      expect(component.products.length).toBeGreaterThan(1, 'product list exists after init');
    });
  });

  it(`should get the empty product list after ngOnInit`, async() => {
    let products: Product[] = [];
    spyOn(productService, 'getProducts').and.returnValue(of(products));
    component.ngOnInit();
    await fixture.whenStable().then(()=>{
      expect(component.products.length).toBe(0, 'should get the empty product list after ngOnInit');
    });
  });

  it(`should get the product list and displayed in the table`, async() => {
    //arrange
    let products: Product[] = [
      {"id":1,"name":"Laptop", "category":"electornics","description":"note book hp laptop", "amount": "50000"},
      {"id":2,"name":"Nokia 1100", "category":"electornics","description":"basic mobile", "amount": "1200"},
    ];
    spyOn(productService, 'getProducts').and.returnValue(of(products));
    
    //act
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable().then(()=>{
      let rowCount = fixture.nativeElement.querySelectorAll('tbody tr').length;
      //assert
      //checking the value of the  product property
      expect(component.products.length).toBe(2, 'should get the product list and displayed in the table');
      //checking the value from the table
      expect(rowCount).toBe(2, 'should get the product list and displayed in the table');
    });
  });
});
