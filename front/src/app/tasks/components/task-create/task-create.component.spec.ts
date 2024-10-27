import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TaskCreateComponent } from "./task-create.component";
import { FormsModule } from "@angular/forms";
import { TasksService } from "../../services/tasks.service";
import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { Task } from "../../models/task.model";

describe("TaskCreateComponent", () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let tasksServiceMock: any;
  let date: Date = new Date('2024-10-27T05:03:05.345Z');

  beforeEach(async () => {
    tasksServiceMock = {
      createTask: jest.fn((task: Task) =>
        of({
          ...task,
          id: "22",
          createdAt: task.createdAt,
        })
      ),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, TaskCreateComponent, HttpClientModule],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit close event on cancel", () => {
    jest.spyOn(component.close, "emit");
    component.onCancel();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it("should call createTask and emit close event on submit", () => {
    component.enteredTitle = "Sample Task";
    component.description = "This is a sample task";

    const newTask = {
      id: "",
      title: component.enteredTitle,
      description: component.description,
      createdAt: new Date(),
      done: false,
    } as Task;

    jest.spyOn(component.close, "emit");
    component.onSubmit();
    expect(tasksServiceMock.createTask).toHaveBeenCalledWith(newTask);
    expect(component.close.emit).toHaveBeenCalled;
  });
});
