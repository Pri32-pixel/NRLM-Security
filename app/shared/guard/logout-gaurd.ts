import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "@src/app/shared/services/auth.service";

@Injectable()
export class LogoutGaurd implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
