import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.less']
})
export class LoginComponentComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  async submitForm(): Promise<void> {
    if (!this.validateForm.valid) {
      return;
    }

    const {email, password} = this.validateForm.getRawValue();

    const hasSignedInSuccessfully = await this.authService.signIn(email, password);

    if (!hasSignedInSuccessfully) {
      console.error('FAILED TO LOGIN');
      return;
    }

    this.router.navigate(['portal', 'dashboard']);
  }
}
