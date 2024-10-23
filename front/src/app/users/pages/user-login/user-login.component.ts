import { Component, input } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { UserFormComponent } from "../../components/user-form/user-form.component";

@Component({
  selector: "app-user-login",
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: "./user-login.component.html",
  styleUrl: "./user-login.component.css",
})
export class UserLoginComponent {
  constructor(private userService: UsersService) {}

  formTitle: string = "Sign in to your account";
  formButtonText: string = "Sign In";
  formLinkText: string = "Register";
  formLink: string = "register";
  optionText: string = "Not a member?";
  inputList = [
    {
      id: "email",
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
    },
  ];
}
