import { mapToCanActivate, Routes } from "@angular/router";
import { TasksListComponent } from "./tasks/pages/tasks-list/tasks-list.component";
import { UserLoginComponent } from "./users/pages/user-login/user-login.component";
import { UserRegisterComponent } from "./users/pages/user-register/user-register.component";
import { AuthGuardService } from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: "tasks",
    component: TasksListComponent,
    canActivate: mapToCanActivate([AuthGuardService]),
  },
  {
    path: "login",
    component: UserLoginComponent,
  },
  {
    path: "register",
    component: UserRegisterComponent,
  },
  {
    path: "**",
    redirectTo: "tasks",
  }
];
