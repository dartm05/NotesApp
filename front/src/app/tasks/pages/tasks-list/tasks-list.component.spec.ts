//ng test --ignore-failures --include='**/tasks-list.component.spec.ts'
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TasksListComponent } from "./tasks-list.component";
import { TasksService } from "../../services/tasks.service";
import { of } from "rxjs";
import { Task } from "../../models/task.model";
import { importProvidersFrom } from "@angular/core";
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

  beforeEach(async () => {
    tasksService = {
      loadTasks: jest.fn().mockReturnValue(of([])),
      createTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
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
    fixture.detectChanges();
  });

  it("should fetch tasks on init", () => {
    tasksService.loadTasks.and.returnValue(of([]));
    component.ngOnInit();
    expect(tasksService.loadTasks).toHaveBeenCalled();
  });

  it("should add a task", () => {
    component.onAddTask();
    expect(component.isAddTask).toBe(true);
  });

  it("should close task creation", () => {
    tasksService.loadTasks.and.returnValue(of([]));
    component.onClose();
    expect(tasksService.loadTasks).toHaveBeenCalled();
    expect(component.isAddTask).toBe(false);
  });

  it("should toggle task done status", () => {
    spyOn(component, "updateTask");
    component.onDoneTask(task);
    expect(component.updateTask).toHaveBeenCalledWith({ ...task, done: true });
  });

  it("should delete a task", () => {
    tasksService.deleteTask.and.returnValue(of({}));
    component.onDeleteTask(task);
    expect(tasksService.deleteTask).toHaveBeenCalledWith(task);
  });

  it("should edit a task", () => {
    spyOn(component, "updateTask");
    component.onEditTask(task);
    expect(component.updateTask).toHaveBeenCalledWith(task);
  });

  it("should update a task", () => {
    tasksService.updateTask.and.returnValue(of({}));
    tasksService.loadTasks.and.returnValue(of([]));
    component.updateTask(task);
    expect(tasksService.updateTask).toHaveBeenCalledWith(task);
    expect(tasksService.loadTasks).toHaveBeenCalled();
  });
});
