import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthChecker } from './auth.checker';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public auth: AuthChecker, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}