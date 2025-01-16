import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface authResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiersIn: string;
  localId: string;
  registred?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUZ28W5A-f2TymmFmXSX21mDmM3rSzzpc',
        {
          email: email,
          password: password,
          returnScureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http.post<authResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUZ28W5A-f2TymmFmXSX21mDmM3rSzzpc',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Nous avons bloqué toutes les demandes provenant de cet appareil en raison d\'une activité inhabituelle. Réessayez plus tard.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Les information n\'est pas valide';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Les information n\'est pas valide';
        break;
    }

    return throwError(errorMessage);
  }
}
