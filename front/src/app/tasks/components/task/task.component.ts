import { Component, effect, input, Input, output, signal } from "@angular/core";
import { Task } from "../../models/task.model";
import { CardComponent } from "../../../shared/components/card/card.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-task",
  standalone: true,
  imports: [CardComponent, DatePipe],
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
  updateTask = output<boolean>();

  constructor() {
    effect(
      () => {
        const currentTask = this.task();
        if (currentTask) {
          this.buttonText.set(currentTask.done ? "Open" : "Complete");
          this.status.set(currentTask.done ? "Done" : "Pending");
        }
      },
      { allowSignalWrites: true }
    );
  }

  onEditTask() {
    this.startEdit.emit(!this.showEdit);
    this.showEdit.set(!this.showEdit());
  }

  onDeleteTask() {
    this.deleteTask.emit(true);
  }

  onUpdateTask() {
    this.updateTask.emit(true);
  }

  onDoneTask() {
    this.updateTask.emit(true);
  }
}
