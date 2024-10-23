import { Routes } from "@angular/router";
import { TasksListComponent } from "./tasks/pages/tasks-list/tasks-list.component";
import { UserLoginComponent } from "./users/pages/user-login/user-login.component";
import { UserRegisterComponent } from "./users/pages/user-register/user-register.component";

export const routes: Routes = [
  {
    path: "tasks",
    component: TasksListComponent,
  },
  {
    path: "login",
    component: UserLoginComponent,
  },
  {
    path: "register",
    component: UserRegisterComponent,
  },
];
