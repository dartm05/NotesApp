import { Component, input } from "@angular/core";
import { UserFormComponent } from "../../components/user-form/user-form.component";

@Component({
  selector: "app-user-register",
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: "./user-register.component.html",
  styleUrl: "./user-register.component.css",
})
export class UserRegisterComponent {
  formTitle: string = "Register";
  formButtonText: string = "Sign up";
  formLinkText: string = "Login";
  formLink: string = "login";
  optionText: string = "Already a member?";
  inputList = [
    {
      id: "name",
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Enter your username",
      required: true,
    },
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
