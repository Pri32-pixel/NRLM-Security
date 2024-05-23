import { AuthService } from "@src/app/shared/services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

@Injectable()
export class AdminCollageGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.isCollageAdmin()) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
