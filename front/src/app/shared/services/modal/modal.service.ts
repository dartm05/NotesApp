import { Injectable, signal } from "@angular/core";
import { Modal } from "../../interfaces/modal.interface";

@Injectable({ providedIn: "root" })
export class ModalService {
  private _modal = signal<Modal | undefined>(undefined);
  modal = this._modal.asReadonly();

  openModal(component: Modal) {
    this._modal.set(component);
  }
  closeModal() {
    this._modal.set(undefined);
  }
}
