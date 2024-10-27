import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserFormComponent } from "./user-form.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ComponentRef } from "@angular/core";

describe("UserFormComponent", () => {
  let component: UserFormComponent;
  let componentRef: ComponentRef<UserFormComponent>;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule, UserFormComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    fixture.componentRef.setInput("formTitle", "Test Title");
    fixture.componentRef.setInput("formButtonText", "Submit");
    fixture.componentRef.setInput("formLinkText", "Click here");
    fixture.componentRef.setInput("formLink", "/test-link");
    fixture.componentRef.setInput("formOptionText", "Test Option");
    fixture.componentRef.setInput("inputList", [
      { name: "testField", type: "text", label: "Test Field", id: "testField" },
    ]);

    const formBuilder = new FormBuilder();
    fixture.componentRef.setInput(
      "formGroup",
      formBuilder.group({
        testField: [""],
      })
    );

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit submitted event on form submit", () => {
    jest.spyOn(component.submitted, "emit");
    component.onSubmit();
    fixture.detectChanges();
    expect(component.submitted.emit).toHaveBeenCalledWith(true);
  });

  it("should render form title", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain("Test Title");
  });

  it("should render form button text", () => {
    const button = fixture.debugElement.query(By.css("button")).nativeElement;
    expect(button.textContent).toContain("Submit");
  });

  it("should render form link text", () => {
    const link = fixture.debugElement.query(By.css("a")).nativeElement;
    expect(link.textContent).toBe("Click here");
    expect(link.getAttribute("href")).toBe("/test-link");
  });

  it("should initialize form group", () => {
    expect(
      fixture.componentRef.instance.formGroup().contains("testField")
    ).toBe(true);
  });

  it("should render input fields", () => {
    const input = fixture.debugElement.query(By.css("input")).nativeElement;
    expect(input.getAttribute("name")).toBe("testField");
  });
});
