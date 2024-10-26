import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../shared/models/auth/user.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private domain = environment.domain;
  private baseUrl = `${this.domain}/users/users`;

  private http = inject(HttpClient);

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${email}`);
  }
}
