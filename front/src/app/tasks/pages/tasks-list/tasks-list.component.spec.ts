//ng test --ignore-failures --include='**/tasks-list.component.spec.ts'
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TasksListComponent } from "./tasks-list.component";
import { TasksService } from "../../services/tasks.service";
import { of } from "rxjs";
import { Task } from "../../models/task.model";
import { importProvidersFrom, signal } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

describe("TasksListComponent", () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let tasksService: any;
  let errorService: any;
  let task: Task = {
    id: "1",
    title: "Test Task",
    description: "Test task update",
    done: false,
    createdAt: new Date(),
  };

  let secondTask: Task = {
    id: "2",
    title: "Test Task",
    description: "Test task update",
    done: false,
    createdAt: new Date(),
  };

  let newTask: Task = {
    id: "3",
    title: "Test Task",
    description: "Test task create",
    done: false,
    createdAt: new Date(),
  };

  let tasks: Task[] = [task, secondTask];

  beforeEach(async () => {
    tasksService = {
      loadTasks: jest.fn().mockReturnValue(of(tasks)),
      createTask: jest.fn().mockReturnValue(of([...tasks, newTask])),
      updateTask: jest
        .fn()
        .mockReturnValue(of([...tasks, { ...task, done: !task.done }])),
      deleteTask: jest
        .fn()
        .mockReturnValue(of(tasks.filter((t) => t.id == task.id))),
      loadedTasks: signal(tasks),
    };

    errorService = {
      setError: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TasksListComponent],
      providers: [
        importProvidersFrom(HttpClientModule),
        { provide: TasksService, useValue: tasksService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it("should fetch tasks on init", () => {
    tasksService.loadTasks;
    component.ngOnInit();
    expect(tasksService.loadTasks).toHaveBeenCalled();
  });

  it("should add a task", () => {
    component.onAddTask();
    expect(component.isAddTask).toBe(true);
  });

  it("should close task creation", () => {
    component.onClose();
    expect(tasksService.loadTasks).toHaveBeenCalled();
    expect(component.isAddTask).toBe(false);
  });

  it("should toggle task done status", () => {
    jest.spyOn(component, "updateTask");
    component.onDoneTask(task);
    expect(component.updateTask).toHaveBeenCalledWith({
      ...task,
      done: !task.done,
    });
  });

  it("should delete a task", () => {
    tasksService.deleteTask;
    component.onDeleteTask(secondTask);
    expect(tasksService.deleteTask).toHaveBeenCalledWith(secondTask);
  });

  it("should edit a task", () => {
    jest.spyOn(component, "updateTask");
    component.onEditTask(task);
    expect(component.updateTask).toHaveBeenCalledWith(task);
  });

  it("should update a task", () => {
    tasksService.updateTask;
    component.updateTask(task);
    expect(tasksService.updateTask).toHaveBeenCalledWith(task);
    expect(tasksService.loadTasks).toHaveBeenCalled();
  });
});
