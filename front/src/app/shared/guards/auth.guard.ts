import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthStateService } from "../services/auth/auth.state.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(
    private authStateService: AuthStateService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authStateService.state) {
      this.router.navigate(["login"]);
    }
    return true;
  }
}
