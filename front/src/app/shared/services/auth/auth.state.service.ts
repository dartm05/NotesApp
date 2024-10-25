import { effect, Injectable, signal } from "@angular/core";
import { User } from "../../models/auth/user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { ErrorService } from "../error/error.service";

@Injectable({
  providedIn: "root",
})
export class AuthStateService {
  constructor(
    public authService: AuthService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  private getUserFromLocalStorage(): User | undefined {
    const token = localStorage.getItem("token");
    return token ? (JSON.parse(token) as User) : undefined;
  }

  state = signal<User | undefined>(this.getUserFromLocalStorage());
  state$ = this.state.asReadonly();

  syncStorage = effect(() => {
    const user = this.state();
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
    }
  });

  siginIn(email: string) {
    this.authService.getUser(email).subscribe((user) => {
      if (user) {
        this.state.set(user);
        this.router.navigate(["tasks"]);
      } else {
        this.errorService.setError("The user does not exist.");
      }
    });
  }

  signOut() {
    this.state.set(undefined);
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  createUser(user: User) {
    this.authService.createUser(user).subscribe((user) => {
      if (user) {
        this.state.set(user);
        this.router.navigate(["tasks"]);
      } else {
        this.errorService.setError("There was an error creating the user.");
      }
    });
  }
}
