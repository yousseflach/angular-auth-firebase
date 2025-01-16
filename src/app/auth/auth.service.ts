import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface authResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiersIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string){
    return this.http.post<authResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUZ28W5A-f2TymmFmXSX21mDmM3rSzzpc',
      {
        email: email,
        password: password,
        returnScureToken: true,
      }
    ).pipe(
      catchError(errorRes => {
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'this email exists already';
        }
        return throwError(errorMessage);
      })
    );
  }
}