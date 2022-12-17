import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDailogComponent } from '../employee-dailog/employee-dailog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private dailog: MatDialog) {}

  ngOnInit(): void {}

  openDailog() {
    this.dailog.open(EmployeeDailogComponent);
  }
}
