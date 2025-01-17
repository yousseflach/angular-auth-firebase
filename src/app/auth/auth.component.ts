import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authobs: Observable<authResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authobs = this.authService.login(email, password);
    } else {
      authobs = this.authService.signup(email, password);
    }

    authobs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
