import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    );
  }
}