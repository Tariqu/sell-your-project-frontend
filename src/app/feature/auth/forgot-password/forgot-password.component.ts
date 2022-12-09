import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwdForm: UntypedFormGroup;

  constructor(private _fb: UntypedFormBuilder) {
    this.forgotPwdForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPwdForm.valid) {
      console.log(this.forgotPwdForm.value);
    }
  }
}
