import { Component, input } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorService } from "../../services/error/error.service";

@Component({
  selector: "app-modal-dialog",
  standalone: true,
  imports: [],
  templateUrl: "./modal-dialog.component.html",
  styleUrl: "./modal-dialog.component.css",
})
export class ModalDialogComponent {
  constructor(public router: Router, private errorService: ErrorService) {}

  title = input<string>();
  message = input<string>();
  action = input<string>();
  actionLabel = input<string>();

  onAction() {
    this.errorService.setError('');
  }
}
