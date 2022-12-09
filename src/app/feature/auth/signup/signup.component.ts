import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;

  constructor(private _fb: UntypedFormBuilder) {
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
      // actual logic will be implemented here
    }
  }
}
