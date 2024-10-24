import { Injectable, signal } from "@angular/core";
import { User } from "../../models/auth/user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { ErrorService } from "../error/error.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthStateService {
  constructor(
    public authService: AuthService,
    private router: Router,
    private errorService: ErrorService
  ) {}
  state = signal<User>(
    {
      id: undefined,
      email: undefined,
      name: undefined,
    } || undefined
  );
  state$ = this.state.asReadonly();

  siginIn(email: string) {
    this.authService.getUser(email).subscribe((user) => {
      this.state.set(user);
      if (user) {
        this.router.navigate(["tasks"]);
      } else {
        this.errorService.setError("The user does not exist.");
      }
    });
  }

  signOut() {
    this.state.set({
      id: undefined,
      name: undefined,
      email: undefined,
    });
    this.router.navigate(["login"]);
  }

  createUser(user: User) {
    this.authService.createUser(user).subscribe((user) => {
      console.log(`usuario${user}`);
      if (user) {
        this.state.set(user);
        this.router.navigate(["tasks"]);
      } else {
        this.errorService.setError("There was an error creating the user.");
      }
    });
  }
}
