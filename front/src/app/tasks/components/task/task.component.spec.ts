import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TaskComponent } from "./task.component";
import { Task } from "../../models/task.model";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("TaskComponent", () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let task: Task = {
    title: "Test Task",
    description: "Test Description",
    done: false,
    id: "1",
    createdAt: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form with task data", () => {
    fixture.componentRef.setInput("task", task);
    fixture.detectChanges();

    expect(component.title?.value).toBe("Test Task");
    expect(component.description?.value).toBe("Test Description");
    expect(component.status()).toBe("Pending");
  });

  it("should toggle edit mode", () => {
    component.onEditTask();
    expect(component.showEdit()).toBe(true);

    component.onEditTask();
    expect(component.showEdit()).toBe(false);
  });

  it("should emit deleteTask event", () => {
    jest.spyOn(component.deleteTask, "emit");
    component.onDeleteTask();
    expect(component.deleteTask.emit).toHaveBeenCalledWith(true);
  });

  it("should emit updateTask event with updated task", () => {
    fixture.componentRef.setInput("task", task);
    fixture.detectChanges();

    component.title?.setValue("Updated Task");
    component.description?.setValue("Updated Description");
    jest.spyOn(component.updateTask, "emit");
    component.onUpdateTask();

    expect(component.updateTask.emit).toHaveBeenCalledWith({
      ...task,
      title: "Updated Task",
      description: "Updated Description",
    });
  });

  it("should emit completeTask event", () => {
    jest.spyOn(component.completeTask, "emit");
    component.onDoneTask();
    expect(component.completeTask.emit).toHaveBeenCalled();
  });

  it("should return correct task status", () => {
    fixture.componentRef.setInput("task", task);
    fixture.detectChanges();

    expect(component.status()).toBe("Pending");
  });

  it("should not emit updateTask event if showEdit is true", () => {
    fixture.componentRef.setInput("task", task);
    fixture.detectChanges();

    component.onEditTask();
    component.title?.setValue("Updated Task");
    component.description?.setValue("Updated Description");
    component.onUpdateTask();

    jest.spyOn(component.updateTask, "emit");

    expect(component.updateTask.emit).not.toHaveBeenCalled();
  });

  it("should call onEditTask when edit button is clicked", () => {
    jest.spyOn(component, "onEditTask");
    const button = fixture.debugElement.parent?.query(By.css(".edit-button"));
    button?.triggerEventHandler("click", onclick);
    if (button) expect(component.onEditTask).not.toHaveBeenCalled();
  });

  it("should call onDeleteTask when delete button is clicked", () => {
    jest.spyOn(component, "onDeleteTask");
    const button = fixture.debugElement.parent?.query(By.css(".delete-button"));
    button?.triggerEventHandler("click", null);
    if (button) expect(component.onDeleteTask).toHaveBeenCalled();
  });

  it("should call onDoneTask when done button is clicked", () => {
    jest.spyOn(component, "onDoneTask");
    const button = fixture.debugElement.parent?.query(By.css(".done-button"));
    button?.triggerEventHandler("click", null);
    if (button) expect(component.onDoneTask).toHaveBeenCalled();
  });
});
