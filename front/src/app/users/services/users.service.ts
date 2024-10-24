// user service

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { catchError, map, Observable } from "rxjs";
import { AuthService } from "../../shared/services/auth/auth.service";

//make calls to auth service to get user and update state
@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private authService: AuthService) {}
}
