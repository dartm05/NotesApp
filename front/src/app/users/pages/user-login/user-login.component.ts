import { Component, input, output } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthStateService } from "../../../shared/services/auth/auth.state.service";

@Component({
  selector: "app-user-login",
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: "./user-login.component.html",
  styleUrl: "./user-login.component.css",
})
export class UserLoginComponent {
  constructor(private authStateService: AuthStateService) {}

  submitted = input<boolean>();

  formGroup: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

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

  onSubmit() {
    this.authStateService.siginIn(this.formGroup.value.email);
  }
}
