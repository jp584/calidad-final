import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginResponse } from 'src/app/models/loginresponse';
import { AuthService } from 'src/app/services/auth.service';
import { TsService } from 'src/app/services/ts.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {} as Login;
  forgotPasswordEmail: string = '';

  constructor(private authService: AuthService, private tsService: TsService, private router: Router) { }

  selectLogin() {
    console.log(this.login);
    this.authService.login(this.login).subscribe((data: LoginResponse) => {
      console.log(data);
      if (data.accessToken) {
        alert("Log In successfully");
        this.tsService.saveToken(data.accessToken);
        this.tsService.saveRefreshToken(data.refreshToken);
        this.tsService.saveUser(data);
        if (data.roles[0] === "ROLE_COACH") {
          this.router.navigate(['/coachdashboard']);
        }
        if (data.roles[0] === "ROLE_REFEREE") {
          this.router.navigate(['/refereedashboard']);
        }
        if (data.roles[0] === "ROLE_ORGANIZER") {
          this.router.navigate(['/organizerdashboard']);
        }
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error) {
        alert(error.error.message);
        this.router.navigate(['/login']);
      }
    });
  }

  openForgotPasswordModal() {
    const modalElement = document.getElementById('forgotPasswordModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  forgotPassword() {
    if (this.forgotPasswordEmail) {
      this.authService.forgotPassword(this.forgotPasswordEmail).subscribe(() => {
        alert('Password reset link sent to your email.');
        const modalElement = document.getElementById('forgotPasswordModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }, (error: HttpErrorResponse) => {
        alert('Error sending password reset link.');
      });
    } else {
      alert('Ingresa tu Correo electronico.');
    }
  }
}
