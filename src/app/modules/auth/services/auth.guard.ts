import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),  // Take the latest value and complete the observable
      map(currentUser => {
        if (currentUser) {
          console.log("passed authGuard")
          // User is authenticated
          return true;
        } else {
          console.log("failed at authGuard")
          // User is not authenticated, redirect to login page with the return URL
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}