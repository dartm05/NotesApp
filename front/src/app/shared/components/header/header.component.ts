import { Component, effect } from "@angular/core";
import { AuthStateService } from "../../services/auth/auth.state.service";
import { User } from "../../models/auth/user.model";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  user: User | undefined;
  constructor(public authStateService: AuthStateService) {
    effect(() => {
      this.user = this.authStateService.state$();
    });
  }

  headerText: string = "Tasks App";

  onAction() {
    if (this.authStateService.state$()) {
      this.authStateService.signOut();
    }
  }
}
