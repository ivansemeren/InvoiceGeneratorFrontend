import { NoAuthGuardService } from './services/no-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { JwtService } from './services/jwt.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [],
  providers: [AuthService, JwtService, HttpInterceptorService, AuthGuardService, NoAuthGuardService]
})
export class CoreModule { }
