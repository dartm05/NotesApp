import { Component, Input, output } from "@angular/core";
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

  @Input({ required: true }) formTitle!: string;
  @Input({ required: true }) formButtonText!: string;
  @Input({ required: true }) formLinkText!: string;
  @Input({ required: true }) formLink!: string;
  @Input({ required: true }) formOptionText!: string;
  @Input({ required: true }) inputList!: Field[];
  @Input({ required: true }) formGroup!: FormGroup;

  onSubmit() {
    this.submitted.emit(true);
  }
}
