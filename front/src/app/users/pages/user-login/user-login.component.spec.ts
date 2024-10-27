import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserLoginComponent } from "./user-login.component";
import { AuthStateService } from "../../../core/auth/auth.state.service";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";

describe("UserLoginComponent", () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let authStateServiceMock: any;

  beforeEach(async () => {
    authStateServiceMock = {
      state$: jest.fn().mockReturnValue(of({})),
      signOut: jest.fn(),
      signIn: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserLoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthStateService, useValue: authStateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a form with email control", () => {
    expect(component.formGroup.contains("email")).toBeTruthy();
  });

  it("should make the email control required", () => {
    let control = component.formGroup.get("email");
    control?.setValue("");
    expect(control?.valid).toBeFalsy();
  });

  it("should call authStateService.signIn on form submit", () => {
    component.formGroup.get("email")?.setValue("test@example.com");
    component.onSubmit();
    expect(authStateServiceMock.signIn).toHaveBeenCalledWith("test@example.com");
  });

  it("should render form title", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h2")?.textContent).toContain(
      "Sign in to your account"
    );
  });

  it("should render form button text", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("button")?.textContent).toContain("Sign In");
  });

  it("should render form link text", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("a")?.textContent).toContain("Register");
  });
});
