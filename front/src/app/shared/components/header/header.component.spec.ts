import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthStateService } from '../../../core/auth/auth.state.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authStateServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authStateServiceMock = {
      state$: jest.fn().mockReturnValue(of({})),
      signOut: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthStateService, useValue: authStateServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default header text', () => {
    expect(component.headerText).toBe('Tasks App');
  });

  it('should navigate to login on sign in', () => {
    component.onSignIn();
    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should call signOut on sign out if user is logged in', () => {
    authStateServiceMock.state$.mockReturnValue(of({}));
    component.onSignOut();
    expect(authStateServiceMock.signOut).toHaveBeenCalled();
  });

  it('should not call signOut on sign out if user is not logged in', () => {
    authStateServiceMock.state$.mockReturnValue(undefined);
    component.onSignOut();
    expect(authStateServiceMock.signOut).not.toHaveBeenCalled();
  });
});