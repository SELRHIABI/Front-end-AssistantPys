import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../../models/user.model';
import { AuthModel } from '../../models/auth.model';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // Redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group({
      lastname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      firstname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      cPassword: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      agree: [false, Validators.required]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  submit() {
    this.hasError = false;

    // Extracting user data from form controls
    const newUser = new UserModel();
    newUser.setUser(this.registrationForm.value);

    // Attempt to register the new user
    const registrationSubscr = this.authService
      .registration(newUser)
      .pipe(first())
      .subscribe({
        next: (user: UserModel) => {
          if (user) {
            // If registration is successful, log the user in
            this.loginAfterRegistration(this.f.email.value, this.f.password.value);
          } else {
            this.hasError = true; // Handle registration error
          }
        },
        error: () => {
          this.hasError = true; // Handle unexpected errors
        }
      });

    this.unsubscribe.push(registrationSubscr);
  }

private loginAfterRegistration(email: string, password: string) {
    // Attempt to log the user in with the provided credentials
    const loginSubscr = this.authService
      .login(email, password)
      .pipe(first())
      .subscribe({
        next: (user: AuthModel | undefined) => {
          if (user) {
            // Navigate to the dashboard or home page upon successful login
            this.router.navigate(['apps/chat/private-chat']); // Adjust the route as needed
          } else {
            this.hasError = true; // Handle login error
          }
        },
        error: () => {
          this.hasError = true; // Handle unexpected login errors
        }
      });

    this.unsubscribe.push(loginSubscr);
}



  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
