// task resolver service

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Injectable({
  providedIn: 'root'
})

export class TaskResolverService implements Resolve<any> {
  constructor(private tasksService: TasksService) {}

  resolve(): Observable<Task[]> {
    return this.tasksService.getTasks();
  }
}