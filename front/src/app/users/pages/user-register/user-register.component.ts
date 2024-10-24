import { Component, input } from "@angular/core";
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthStateService } from "../../../shared/services/auth/auth.state.service";

@Component({
  selector: "app-user-register",
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: "./user-register.component.html",
  styleUrl: "./user-register.component.css",
})
export class UserRegisterComponent {
  constructor(public authStateService: AuthStateService) {}
  formGroup: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
  });
  submitted = input<boolean>();
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

  onSubmit() {
    if (this.formGroup.valid) {
      this.authStateService.createUser(this.formGroup.value);
    }
  }
}
