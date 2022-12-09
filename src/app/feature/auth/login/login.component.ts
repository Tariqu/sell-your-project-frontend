import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value).subscribe({
        next: (val: any) => {
          this._snackBar.open('Login successfully', '', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          localStorage.setItem('token', val.token);
        },
        error: (val: any) => {
          this._snackBar.open(val.error.message, 'ok', { duration: 1000 });
        },
      });
    }
  }
}
