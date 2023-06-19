import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ProductService } from '../shared/product.service'

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  filteredProduct: any = [];
  product: any = [];
  searchForm: FormGroup;
  productId: any;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      keyword: [''],
    });
  }

  clear() {
    this.searchForm.get('keyword').setValue('');
    this.searchGrid();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.product = res.data;
      this.filteredProduct = this.product;
    });
  }

  editProduct(ssID) {
    this.router.navigate(['/edit'], {
      queryParams: { mode: 'EDIT', id: ssID },
    });
  }
  addProduct() {
    this.router.navigate(['/create'], { queryParams: { mode: 'CREATE' } });
  }
  searchGrid() {
    let keyword = this.searchForm.controls['keyword'].value;
    if (keyword === '') {
      this.filteredProduct = this.product;
    } else {
      keyword = keyword.toLowerCase();
      this.filteredProduct = this.product.filter((product) => {
        return (
          (product.sku && product.sku.toLowerCase().includes(keyword)) ||
          (product.name && product.name.includes(keyword)) ||
          (product.price && product.price.includes(keyword))
        );
      });
    }
  }
  deleteProductConfirmation(data) {
    this.productId = data.id;
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      accept: () => {
        this.deleteProduct(this.productId);
      },
    });
  }
  deleteProduct(id) {
    console.log(id);
    
    this.productService.deleteProduct(id).subscribe((res: any) => {
      this.getAllProducts();
    });
  }
}
