import { JwtService } from './../core/services/jwt.service';
import { AuthService } from './../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  title = '';
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
              private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.initForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }

  onSubmit() {
    if (this.title === 'Signup') {
      console.log('Sign Process');
      this.authService.signup(this.authForm.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/dashboard', 'invoices']);
      }, err => this.errorHandler(err, 'Opps, something went wrong'));
    } else {
    console.log(this.authForm.value);
    this.authService.login(this.authForm.value)
    .subscribe(data => {
      this.jwtService.setToken(data.token);
      this.router.navigate(['/dashboard', 'invoices']);
      console.log(data); }, err => this.errorHandler(err, 'Opps, something went wrong')
    );
   }
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private errorHandler(error, massage) {
    console.log(error);
    this.snackBar.open(massage, 'Error', {
      duration: 2000,
    });
  }

}
