import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private jwtService: JwtService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.jwtService.getToken()) {
      return true;
    } else {
      //  // tslint:disable-next-line:no-debugger
      //  debugger;
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
