import { Injectable, signal } from "@angular/core";
import { Error } from "../../models/error.model";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  _error = signal<Error | undefined>(undefined);
  error = this._error.asReadonly();

  setError(error: Error | undefined) {
    this._error.set(error);
  }
  clearError() {
    this._error.set(undefined);
  }
}
