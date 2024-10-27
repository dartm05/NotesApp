import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterComponent } from './user-register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthStateService } from '../../../core/auth/auth.state.service';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;
  let authStateService: AuthStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UserFormComponent],
      providers: [
        { provide: AuthStateService, useValue: { createUser: jest.fn() } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    authStateService = TestBed.inject(AuthStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should have a form with name and email controls', () => {
    expect(component.formGroup.contains('name')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.formGroup.get('name');
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    }
  });

  it('should make the email control required and validate email format', () => {
    const control = component.formGroup.get('email');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();

    control!.setValue('invalid-email');
    expect(control!.valid).toBeFalsy();

    control!.setValue('test@example.com');
    expect(control!.valid).toBeTruthy();
  });

  it('should call authStateService.createUser on form submit if form is valid', () => {
    const spy = jest.spyOn(authStateService, 'createUser');
    component.formGroup.setValue({ name: 'Test User', email: 'test@example.com' });
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com' });
  });

  it('should not call authStateService.createUser on form submit if form is invalid', () => {
    const spy = jest.spyOn(authStateService, 'createUser');
    component.formGroup.setValue({ name: '', email: '' });
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  }); 
});
