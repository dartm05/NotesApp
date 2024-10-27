import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { TaskComponent } from "../../components/task/task.component";
import { TasksService } from "../../services/tasks.service";
import { Task } from "../../models/task.model";
import { TaskCreateComponent } from "../../components/task-create/task-create.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  imports: [TaskComponent, TaskCreateComponent],
  templateUrl: "./tasks-list.component.html",
  styleUrl: "./tasks-list.component.css",
})
export class TasksListComponent implements OnInit {
  constructor(private tasksService: TasksService) {}
  private destroRef = inject(DestroyRef);
  tasks = this.tasksService.loadedTasks;
  error = signal<string | null>(null);
  isFetching = signal<boolean>(false);
  isAddTask = false;

  ngOnInit() {
    this.isFetching.set(true);
    this.tasksService
      .loadTasks()
      .pipe(takeUntilDestroyed(this.destroRef))
      .subscribe({
        error: () => {
          this.isFetching.set(false);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }

  onAddTask() {
    this.isAddTask = true;
  }
  onClose() {
    this.tasksService.loadTasks();
    this.isAddTask = false;
  }

  onDoneTask(task: Task) {
    this.updateTask({ ...task, done: !task.done });
  }

  onDeleteTask(task: Task) {
    this.tasksService.deleteTask(task).subscribe({});
  }

  onEditTask(task: Task) {
    this.updateTask(task);
  }

  updateTask(task: Task) {
    this.tasksService
      .updateTask(task)
      .pipe(takeUntilDestroyed(this.destroRef))
      .subscribe({
        next: () => {
          this.tasksService.loadTasks().subscribe({
            error: () => {
              this.isFetching.set(false);
            },
            complete: () => {
              this.isFetching.set(false);
            },
          });
        },
      });
  }
}
