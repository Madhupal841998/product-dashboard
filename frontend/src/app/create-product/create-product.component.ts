import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productsForm: FormGroup;
  mode: string = 'CREATE';
  productId: any;
  products: any = [];
  imageArr: any = [];
  imagesStr: any = [];
  file: any = [];
  uploadValidationErr: any;
  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.queryParams
      .subscribe(params => {
        this.mode = params.mode;
        if (!!params.id) {
          this.productId = params.id;
          this.getProductsById(this.productId);
        }
      });
  }

  getProductsById(id) {
    this.productService.getProductsById(id).subscribe((res: any) => {
      if (res.status == true) {
        this.products = res.data;
        this.setData(this.products);
      }
    });
  }

  setData(data) {
    this.mode = 'EDIT';
    this.productsForm.get('sku').setValue(data.sku);
    this.productsForm.get('name').setValue(data.name);
    this.productsForm.get('price').setValue(data.price);
    this.imageArr = data.images;
  }

  createForm() {
    this.productsForm = this.fb.group({
      sku: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  addProduct() {
    const formData = new FormData();
    formData.append('sku', this.productsForm.controls['sku'].value);
    formData.append('name', this.productsForm.controls['name'].value);
    formData.append('price', this.productsForm.controls['price'].value);
  
    for (let i = 0; i < this.imageArr.length; i++) {
      formData.append('images', this.imageArr[i]);
    }
  
    this.productService.saveProducts(formData).subscribe((res: any) => {
      if (res.status == true) {
        this.messageService.add({ severity: 'success', summary: 'Product Added Successfully!!', detail: 'Form Submitted!!' });
        this.router.navigate(['/edit'], {
          queryParams: { id: res.data.id, mode: 'EDIT' }
        });
      } else {
        this.messageService.add({ severity: 'error', summary: res.message, detail: 'Please Try Again !!' });
      }
    });
  }
  

  editProduct() {
    this.productService.updateProducts({
      id: this.productId,
      sku: this.productsForm.controls['sku'].value,
      name: this.productsForm.controls['name'].value,
      price: this.productsForm.controls['price'].value,
      images: this.imageArr
    }).subscribe((res: any) => {
      if (res.status == true) {
        this.messageService.add({ severity: 'success', summary: 'Product Updated Successfully!!', detail: 'Form Submitted!!' });
        this.router.navigate(['/edit'], {
          queryParams: { id: this.productId, mode: 'EDIT' }
        });
      } else {
        this.messageService.add({ severity: 'error', summary: res.message, detail: 'Please Try Again !!' });
      }
    });
  }

  generateId(type) {
    const genId = new Date().getTime().toString(36).toUpperCase();
    if (genId.length === 8) {
      return (type + '0' + genId).toUpperCase();
    } else if (genId.length === 9) {
      return (type + genId).toUpperCase();
    }
  }



  genrateFileName(type) {
    const genId = new Date().getTime().toString(36).toUpperCase();
    if (genId.length === 8) {
      return (type + '0' + genId).toUpperCase();
    } else {
      return (type + genId).toUpperCase();
    }
  }

  getFileDetails(event: any) {

    if(event.target.files.length > 0){
      const file = event.target.files
      this.imageArr = file
    }
   
  }
  
  
  
} 

  

