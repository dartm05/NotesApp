import { mapToCanActivate, Routes } from "@angular/router";
import { AuthGuardService } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "tasks",
    loadComponent: () =>
      import("./tasks/pages/tasks-list/tasks-list.component").then(
        (m) => m.TasksListComponent
      ),
    canActivate: mapToCanActivate([AuthGuardService]),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./users/pages/user-login/user-login.component").then(
        (m) => m.UserLoginComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./users/pages/user-register/user-register.component").then(
        (m) => m.UserRegisterComponent
      ),
  },
  {
    path: "**",
    redirectTo: "tasks",
  },
];
