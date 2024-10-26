import { effect, Injectable, signal } from "@angular/core";

import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthStateService } from "../../core/auth/auth.state.service";
import { User } from "../../shared/models/auth/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(
    private authStateService: AuthStateService,
    private router: Router
  ) {
    effect(
      () => {
        this.user.set(this.authStateService.state$());
      },
      { allowSignalWrites: true }
    );
  }
  user = signal<User | undefined>(undefined);

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem("token");
    if (!this.user || !token) {
      this.router.navigate(["login"]);
    }
    return true;
  }
}
