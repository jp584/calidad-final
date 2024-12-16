import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordSetting } from 'src/app/models/passwordsetting';
import { Signup } from 'src/app/models/signup';
import { SignupResponse } from 'src/app/models/signupresponse';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup = { role: ["coach"] } as Signup;
  passwordSetting: PasswordSetting | undefined;
  numberUppercase = 0;
  numberLowercase = 0;
  numberDigit = 0;
  numberSpetial = 0;
  numberCharacter = 0;
  loginFailed = false;  // Para manejar el estado de error de login

  constructor(private authService: AuthService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.readPasswordSetting().subscribe((data: PasswordSetting) => {
      if (data) {
        this.passwordSetting = data;

        let indexUpercaseLeft = data.pattern.indexOf("{");
        let indexUpercaseRight = data.pattern.indexOf(",");
        let indexLowercaseLeft = data.pattern.indexOf("{", indexUpercaseLeft + 1);
        let indexLowercaseRight = data.pattern.indexOf(",", indexUpercaseRight + 1);
        let indexDigitLeft = data.pattern.indexOf("{", indexLowercaseLeft + 1);
        let indexDigitRight = data.pattern.indexOf(",", indexLowercaseRight + 1);
        let indexSpetialLeft = data.pattern.indexOf("{", indexDigitLeft + 1);
        let indexSpetialRight = data.pattern.indexOf(",", indexDigitRight + 1);
        let indexNumberLeft = data.pattern.indexOf("{", indexSpetialLeft + 1);
        let indexNumberRight = data.pattern.indexOf(",", indexSpetialRight + 1);

        this.numberUppercase = Number(data.pattern.substring(indexUpercaseLeft + 1, indexUpercaseRight));
        this.numberLowercase = Number(data.pattern.substring(indexLowercaseLeft + 1, indexLowercaseRight));
        this.numberDigit = Number(data.pattern.substring(indexDigitLeft + 1, indexDigitRight));
        this.numberSpetial = Number(data.pattern.substring(indexSpetialLeft + 1, indexSpetialRight));
        this.numberCharacter = Number(data.pattern.substring(indexNumberLeft + 1, indexNumberRight));
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
      }
    });
  }

  selectedSignUp() {
    this.authService.register(this.signup).subscribe((data: SignupResponse) => {
      if (data) {
        alert(data.message);
        this.router.navigate(['/login']);
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
        this.router.navigate(['/signup']);
      }
    });
  }

  forgotPassword() {
    const email = this.signup.email;
    if (email) {
      this.authService.forgotPassword(email).subscribe(response => {
        alert('Password reset link sent to your email.');
      }, (error: HttpErrorResponse) => {
        alert('Error sending password reset link.');
      });
    } else {
      alert('Please enter your email address.');
    }
  }
}
