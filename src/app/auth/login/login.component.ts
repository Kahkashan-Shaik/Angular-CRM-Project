import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  togglespinner = false;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  email1: string;
  password1: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.submitted = true;
    this.authService.login((this.email?.value)  , (this.password?.value) ).subscribe((data) => {
       if (this.authService.isLoggedIn()) {
         this.togglespinner = true;
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
          // var urlbase = location.origin+'/djtheblaxng/dashboard';
          // var urlbase = location.origin+'/djtheblaxng/dashboard';
          // location.href=urlbase;
          this.router.navigate([redirect]);
        } else {
          this.loginError = 'email or password is incorrect.';
        }
      },
      error => this.error = error
    );
  }
}