import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { IProduct } from './product.model';

@Component({
  selector: 'app-product-dailog',
  templateUrl: './product-dailog.component.html',
  styleUrls: ['./product-dailog.component.scss'],
})
export class ProductDailogComponent implements OnInit {
  productForm: FormGroup;
  education: string[] = [
    '10th',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<ProductDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {
    this.productForm = this._fb.group<IProduct>({
      title: '',
      thumbnail: '',
      productImage: this._fb.array<string>([]),
      price: null,
      shortDescription: '',
      description: '',
      productUrl: '',
      category: this._fb.array<string>([]),
      tags: this._fb.array<string>([]),
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.productForm.patchValue(this.data);
      // for adding value in arrayform field
      this.data.productImage.forEach((val: string) => {
        this.addProductImage(val);
      });
      this.data.category.forEach((val: string) => {
        this.addCategory(val);
      });
      this.data.tags.forEach((val: string) => {
        this.addTag(val);
      });
    } else {
      // Atleast create one black entry
      this.addProductImage();
      this.addCategory();
      this.addTag();
    }
  }

  get productImagesForm() {
    return this.productForm.get('productImage') as FormArray;
  }

  get categoryForm() {
    return this.productForm.get('category') as FormArray;
  }

  get tagForm() {
    return this.productForm.get('tags') as FormArray;
  }

  addProductImage(val: string = '') {
    this.productImagesForm.push(this._fb.control(val));
  }

  addCategory(val: string = '') {
    this.categoryForm.push(this._fb.control(val));
  }

  addTag(val: string = '') {
    this.tagForm.push(this._fb.control(val));
  }

  deleteProductImage(i: number) {
    this.productImagesForm.removeAt(i);
  }

  deleteCategory(i: number) {
    this.categoryForm.removeAt(i);
  }

  deleteTag(i: number) {
    this.tagForm.removeAt(i);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return this._snackBar.open('Invalid form', 'ok', {
        verticalPosition: 'top',
      });
    }
    if (!this.data) {
      return this._productService.addProduct(this.productForm.value).subscribe({
        next: (val) => {
          console.log(val);
          this._snackBar.open('Product added successfully..', 'ok', {
            verticalPosition: 'top',
          });
          this._dialogRef.close(val);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    return this._productService
      .updateProduct(this.data.id, this.productForm.value)
      .subscribe({
        next: (val) => {
          console.log(val);
          this._snackBar.open('updated successfully..', 'ok');
          this._dialogRef.close(val);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
