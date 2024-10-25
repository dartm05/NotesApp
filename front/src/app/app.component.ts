import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/components/header/header.component";
import { ModalDialogComponent } from "./shared/components/modal-dialog/modal-dialog.component";
import { ErrorService } from "./shared/services/error/error.service";
import { ModalService } from "./shared/services/modal/modal.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, FormsModule, HeaderComponent, ModalDialogComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "tasks-app";
  private errorService = inject(ErrorService);
  private modalService = inject(ModalService);
  error = this.errorService.error;
  modal = this.modalService.modal;
}
