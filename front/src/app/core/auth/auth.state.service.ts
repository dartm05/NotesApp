import { DestroyRef, effect, inject, Injectable, signal } from "@angular/core";
import { User } from "../../shared/models/auth/user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { ErrorService } from "../../shared/services/error/error.service";
import { ModalService } from "../../shared/services/modal/modal.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class AuthStateService {
  destroyRef = inject(DestroyRef);
  authService = inject(AuthService);
  router = inject(Router);
  errorService = inject(ErrorService);
  modalService = inject(ModalService);

  state = signal<User | undefined>(this.getUserFromLocalStorage());
  state$ = this.state.asReadonly();

  private getUserFromLocalStorage(): User | undefined {
    const token = localStorage.getItem("token");
    return token ? (JSON.parse(token) as User) : undefined;
  }

  syncStorage = effect(() => {
    const user = this.state();
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
    }
  });

  signIn(email: string) {
    this.authService
      .getUser(email)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.state.set(user);
          this.router.navigate(["tasks"]);
        },
      });
  }

  signOut() {
    this.state.set(undefined);
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  createUser(user: User) {
    this.authService
      .createUser(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.state.set(user);
          this.modalService.openModal({
            title: "User created",
            message: "The user has been created successfully.",
            actionLabel: "Close",
            image: "assets/img/created_user.svg",
          });
          this.router.navigate(["tasks"]);
        },
      });
  }
}
