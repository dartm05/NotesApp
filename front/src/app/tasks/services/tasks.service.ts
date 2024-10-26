import { DestroyRef, effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task.model";
import { catchError, map, Observable, tap } from "rxjs";
import { Error } from "../../shared/models/error.model";
import { AuthStateService } from "../../core/auth/auth.state.service";
import { environment } from "../../../environments/environment";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  tasksUrl = signal<string>("");
  tasks = signal<Task[]>([]);
  loadedTasks = this.tasks.asReadonly();
  destroyRef = inject(DestroyRef);

  private domain: string = "";

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {
    this.domain = environment.domain;
    effect(
      () => {
        const currentUser = this.authStateService.state$();
        if (currentUser) {
          this.tasksUrl.set(`${this.domain}/${currentUser.id}/tasks`);
        }
      },
      { allowSignalWrites: true }
    );
  }

  loadTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      tap({
        next: (tasks) => {
          this.tasks.set(tasks);
        },
      })
    );
  }

  editTask(task: Task) {
    this.updateTask(task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (task) => {
          const prevTasks = this.tasks();
          const index = prevTasks.findIndex(
            (prevTask) => prevTask.id === task.id
          );
          prevTasks[index] = task;
          this.tasks.set(prevTasks);
        },
      });
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.tasksUrl())
      .pipe(map((data: Task[]) => data));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl(), task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl()}/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<Task> {
    const prevtasks = this.tasks();
    this.tasks.update((prevtasks) =>
      prevtasks.filter((prevtask) => prevtask.id !== task.id)
    );
    return this.http.delete<Task>(`${this.tasksUrl()}/${task.id}`).pipe(
      catchError((error: Error) => {
        this.tasks.set(prevtasks);
        throw error;
      })
    );
  }
}
