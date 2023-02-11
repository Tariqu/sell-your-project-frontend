import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface ISignup {
  userType?: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.signupForm = this._fb.group({
      userType: '2',
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      address: this._fb.group({
        streetAddress: [''],
        city: [''],
        state: [''],
        zipcode: [''],
        country: [''],
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this._auth.signup(this.signupForm.value).subscribe({
        next: (val: any) => {
          this._snackBar.open('Registration successfully', 'ok', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this._router.navigate(['/auth/login']);
        },
        error: (err: any) => {
          console.log(err);
          alert(err.error.message);
        },
      });
    }
  }
}
