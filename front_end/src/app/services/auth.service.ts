import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Login } from '../models/login';
import { LoginResponse } from '../models/loginresponse';
import { Signup } from '../models/signup';
import { SignupResponse } from '../models/signupresponse';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.apiUrl + '/api/auth/signin';
  private signupUrl = environment.apiUrl + '/api/auth/signup';
  private refreshTokenUrl = environment.apiUrl + '/api/auth/refreshtoken';
  private forgotPasswordUrl = environment.apiUrl + '/api/auth/forgot-password';
  private resetPasswordUrl = environment.apiUrl + '/api/auth/reset-password';

  constructor(private http: HttpClient) { }

  login(login: Login) {
    return this.http.post<LoginResponse>(this.loginUrl, login);
  }

  register(signup: Signup) {
    return this.http.post<SignupResponse>(this.signupUrl, signup)
  }

  refreshToken(token: string) {
    return this.http.post(this.refreshTokenUrl, {
      refreshToken: token
    });
  }

  forgotPassword(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.post(this.forgotPasswordUrl, {}, { params });
  }


  resetPassword(token: string, newPassword: string) {
    return this.http.post(this.resetPasswordUrl, { token, newPassword });
  }
}
