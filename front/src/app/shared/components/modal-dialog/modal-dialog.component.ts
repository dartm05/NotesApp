import { Component, input } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorService } from "../../services/error/error.service";
import { ModalService } from "../../services/modal/modal.service";

@Component({
  selector: "app-modal-dialog",
  standalone: true,
  imports: [],
  templateUrl: "./modal-dialog.component.html",
  styleUrl: "./modal-dialog.component.css",
})
export class ModalDialogComponent {
  constructor(
    public router: Router,
    private errorService: ErrorService,
    private modalService: ModalService
  ) {}

  title = input<string>();
  message = input<string>();
  actionLabel = input<string>();
  image = input<string>();

  onAction() {
    if (this.errorService.error()) {
      this.errorService.setError(undefined);
    } else {
      this.modalService.closeModal();
    }
  }
}
