import { Component, input, Input, output } from "@angular/core";
import { Field } from "../../interfaces/field.component.interface";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./user-form.component.html",
  styleUrl: "./user-form.component.css",
})
export class UserFormComponent {
  submitted = output<boolean>();

  formTitle = input.required<string>();
  formButtonText = input.required<string>();
  formLinkText = input.required<string>();
  formLink = input.required<string>();
  formOptionText = input.required<string>();
  inputList = input.required<Field[]>();
  formGroup = input.required<FormGroup>();

  onSubmit() {
    this.submitted.emit(true);
  }
}
