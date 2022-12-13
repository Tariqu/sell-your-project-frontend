import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { DetailComponent } from './detail/detail.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, ProductRoutingModule, MatCardModule],
})
export class ProductModule {}
