import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class NoAuthGuardService implements CanActivate {

  constructor() { }
  canActivate(): boolean {
    return true;
  }

}
