import {
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  OnInit,
  signal,
} from "@angular/core";
import { TaskComponent } from "../../components/task/task.component";
import { TasksService } from "../../services/tasks.service";
import { Task } from "../../models/task.model";
import { TaskCreateComponent } from "../../components/task-create/task-create.component";
import { ErrorService } from "../../../shared/services/error/error.service";
@Component({
  selector: "app-tasks-list",
  standalone: true,
  imports: [TaskComponent, TaskCreateComponent],
  templateUrl: "./tasks-list.component.html",
  styleUrl: "./tasks-list.component.css",
})
export class TasksListComponent implements OnInit {
  constructor(
    private tasksService: TasksService,
    private errorService: ErrorService
  ) {}
  private destroRef = inject(DestroyRef);
  error = signal<string | null>(null);
  tasks = this.tasksService.loadedTasks;
  isFetching = signal<boolean>(false);
  isAddTask = false;

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.tasksService.loadTasks().subscribe({
      error: (error) => {
        this.error.set(error.message);
        this.isFetching.set(false);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
    this.destroRef.onDestroy(() => {
      subscription.unsubscribe();
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
    this.tasksService.deleteTask(task).subscribe({
      error: (error) => {
        this.errorService.setError(error.message);
      },
    });
  }

  onEditTask(task: Task) {
    this.updateTask(task);
  }

  updateTask(task: Task) {
    this.tasksService.updateTask(task).subscribe({
      error: (error) => {
        this.errorService.setError(error.message);
      },
      next: () => {
        this.tasksService.loadTasks().subscribe({
          error: (error) => {
            this.error.set(error.message);
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
