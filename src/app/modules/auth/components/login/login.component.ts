import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthentificationResponse } from '../../models/AuthentificationResponse.model';
import { AuthModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    email: 'sou@gmail.com',
    password: 'securePassword123',
  };
  loginForm: FormGroup;
  hasError = false;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    this.checkIfUserIsAlreadyLoggedIn();
  }

  ngOnInit(): void {
    this.initForm();
    console.log("router:",this.route)
    // get return url from route parameters or default to '/apps/chat/private-chat'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/chat';
    console.log("Return URL:", this.returnUrl); // Log returnUrl
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    console.log("Submitting login form with:", this.f.email.value, this.f.password.value);
    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (user: AuthentificationResponse) => {
          console.log("Login response received:", user);
          if (user) {
            console.log("Authenticated user:", user);
            const auth = new AuthModel();

            //storing the tokens that we need to use 
            auth.authToken = user.token;
            console.log("Token in AuthModel:", auth.authToken);
            localStorage.setItem('authToken', auth.authToken);
            console.log("authTokenStored :", auth.authToken)
            localStorage.setItem('refreshToken', auth.refreshToken);
            localStorage.setItem('idUser',user.id.toString());
            console.log("the idUser stored :", user.id.toString())

            console.log("Tokens stored in localStorage:", localStorage);

            console.log("Tokens stored, navigating to returnUrl:", this.returnUrl);
            this.router.navigateByUrl(this.returnUrl).then(success => {
              if (success) {
                console.log("Navigation successful");
              } else {
                console.error("Navigation failed");
              }
            });
          } else {
            this.hasError = true;
            console.log("No user received in response.");
          }
        },
        error: (error) => {
          this.hasError = true;
          console.error("Error during login request:", error);
        }
      });
    this.unsubscribe.push(loginSubscr);
  }


  private checkIfUserIsAlreadyLoggedIn(): void {
    this.authService.currentUser$.pipe(first()).subscribe(user => {
      if (user) {
        console.log("User is already connected");
        this.router.navigateByUrl('/apps/chat');
      } else {
        console.log("User is not already connected");
      }
    });
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
