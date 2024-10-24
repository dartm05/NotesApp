import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Task } from "../models/task.model";
import { catchError, map, Observable, tap } from "rxjs";
import { ErrorService } from "../../shared/services/error/error.service";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private userId = "a0H4irXfnq0JJb5kbF9C";
  private tasksUrl = `http://127.0.0.1:5001/tasks-app-b53c1/us-central1/api/${this.userId}/tasks`;

  tasks = signal<Task[]>([]);
  loadedTasks = this.tasks.asReadonly();

  constructor(private http: HttpClient, private errorService: ErrorService) {}

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
    this.updateTask(task).subscribe({
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
      .get<Task[]>(this.tasksUrl)
      .pipe(map((data: any) => data as Task[]));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task).pipe(
      catchError((error: any) => {
        this.errorService.setError(error);
        throw error;
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task).pipe(
      catchError((error: any) => {
        this.errorService.setError(error);
        throw error;
      })
    );
  }

  deleteTask(task: Task): Observable<Task> {
    const prevtasks = this.tasks();
    this.tasks.update((prevtasks) =>
      prevtasks.filter((prevtask) => prevtask.id !== task.id)
    );
    return this.http.delete<Task>(`${this.tasksUrl}/${task.id}`).pipe(
      catchError((error: any) => {
        this.tasks.set(prevtasks);
        this.errorService.setError(error);
        throw error;
      })
    );
  }
}
