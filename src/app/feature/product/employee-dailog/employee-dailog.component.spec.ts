import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDailogComponent } from './employee-dailog.component';

describe('EmployeeDailogComponent', () => {
  let component: EmployeeDailogComponent;
  let fixture: ComponentFixture<EmployeeDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
