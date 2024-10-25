import { Component, effect, input, Input, output, signal } from "@angular/core";
import { Task } from "../../models/task.model";
import { CardComponent } from "../../../shared/components/card/card.component";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { EditableFieldComponent } from "../editable-field/editable-field.component";

@Component({
  selector: "app-task",
  standalone: true,
  imports: [
    CardComponent,
    DatePipe,
    EditableFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./task.component.html",
  styleUrl: "./task.component.css",
})
export class TaskComponent {
  task = input<Task>();

  showEdit = signal<boolean>(false);
  buttonText = signal<string>("");
  status = signal<string>("");

  startEdit = output<boolean>();
  deleteTask = output<boolean>();
  updateTask = output<Task>();
  completeTask = output<boolean>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [""],
      description: [""],
    });

    effect(
      () => {
        const currentTask = this.task();
        if (currentTask) {
          this.status.set(currentTask.done ? "Done" : "Pending");
          this.form.patchValue({
            title: currentTask.title,
            description: currentTask.description,
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  get title() {
    return this.form.get("title");
  }

  get description() {
    return this.form.get("description");
  }

  get isTaskDone() {
    return this.status() === "Done";
  }

  get isTaskPending() {
    return this.status() === "Pending";
  }

  onEditTask() {
    this.showEdit.set(!this.showEdit());
  }

  onDeleteTask() {
    this.deleteTask.emit(true);
  }

  onUpdateTask() {
    const newTask = {
      ...this.task(),
      title: this.title!.value,
      description: this.description!.value,
    } as Task;
    if (!this.showEdit()) {
      this.updateTask.emit(newTask);
    }
  }

  onDoneTask() {
    this.completeTask.emit(true);
  }
}
