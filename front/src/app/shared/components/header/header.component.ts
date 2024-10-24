import { Component, computed } from "@angular/core";
import { AuthStateService } from "../../services/auth/auth.state.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  constructor(public authStateService: AuthStateService) {}

  headerText: string = "Tasks App";

  user = this.authStateService.state$;

  onAction() {
    if (this.authStateService.state()) {
      this.authStateService.signOut();
    }
  }
}
