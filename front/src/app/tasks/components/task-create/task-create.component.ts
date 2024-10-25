import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-task-create",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./task-create.component.html",
  styleUrl: "./task-create.component.css",
})
export class TaskCreateComponent {
  constructor(private tasksService: TasksService) {}

  @Output() close = new EventEmitter<void>();
  enteredTitle = "";
  description = "";
  enteredDate = "";

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    const newTask = {
      id: "",
      title: this.enteredTitle,
      description: this.description,
      createdAt: new Date(),
      done: false,
    };
    this.tasksService.createTask(newTask).subscribe((createdTask) => {
      this.tasksService.tasks.set([...this.tasksService.tasks(), createdTask]);
      this.close.emit();
    });
  }
}
