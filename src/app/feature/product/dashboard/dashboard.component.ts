import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductDailogComponent } from '../product-dailog/product-dailog.component';
import { IProduct } from '../product-dailog/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'thumbnail',
    'title',
    'price',
    'shortDescription',
    'description',
    'productUrl',
    'category',
    'tags',
    'action',
  ];
  dailogRef!: MatDialogRef<any>;
  dataSource!: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dailog: MatDialog,
    private _productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (val: IProduct[]) => {
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {},
    });
  }

  openDailog() {
    this.dailogRef = this._dailog.open(ProductDailogComponent);

    this.dailogRef.afterClosed().subscribe((val) => {
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdate(row: any) {
    const dailogRef = this._dailog.open(ProductDailogComponent, {
      data: row,
    });
    dailogRef.afterClosed().subscribe((val) => {
      this.ngOnInit();
    });
  }

  onDelete(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: (val) => {
        this._snackBar.open('Product deleted successfully..', 'done');
        this.ngOnInit();
      },
      error: (err) => {
        this._snackBar.open(`Failed! ${err.message}`, 'ok');
      },
    });
  }

  ngOnDestroy(): void {
    this.dailogRef.close();
  }
}
