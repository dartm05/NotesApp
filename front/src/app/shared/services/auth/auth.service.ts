// service that has the state of user login

import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/auth/user.model";
import { Observable, catchError } from "rxjs";
import { ErrorService } from "../error/error.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl =
    "http://127.0.0.1:5001/tasks-app-b53c1/us-central1/api/users/users";
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      catchError((error: any) => {
        this.errorService.setError(error);
        throw error;
      })
    );
  }

  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${email}`).pipe(
      catchError((error: any) => {
        this.errorService.setError(error);
        throw error;
      })
    );
  }
}
