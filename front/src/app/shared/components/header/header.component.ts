import { Component, effect } from "@angular/core";
import { AuthStateService } from "../../services/auth/auth.state.service";
import { User } from "../../models/auth/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  user: User | undefined;

  constructor(
    public authStateService: AuthStateService,
    public router: Router
  ) {
    effect(() => {
      this.user = this.authStateService.state$();
      this.isLoggedIn = !!this.authStateService.state$();
    });
  }

  headerText: string = "Tasks App";
  isLoggedIn = false;

  onSignIn() {
    this.router.navigate(["login"]);
  }

  onSignOut() {
    if (this.authStateService.state$()) {
      this.authStateService.signOut();
    }
  }
}
