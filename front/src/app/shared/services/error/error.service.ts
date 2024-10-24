import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class ErrorService {
  _error = signal<string>('');
  error = this._error.asReadonly();

  setError(message: string) {
    this._error.set(message);
  }
  clearError() {
    this._error.set('');
  }
}
