import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  userDetail: any;

  constructor(private _product: ProductService) {}

  ngOnInit(): void {
    this._product.getDetail().subscribe({
      next: (val: any) => {
        console.log(val);
        this.userDetail = val;
      },
      error: (err) => {},
    });
  }
}
