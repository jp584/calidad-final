import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PasswordSetting } from 'src/app/models/passwordsetting';
import { Signup } from 'src/app/models/signup';
import { SignupResponse } from 'src/app/models/signupresponse';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-organizer-user',
  templateUrl: './organizer-user.component.html',
  styleUrls: ['./organizer-user.component.css']
})
export class OrganizerUserComponent {
  users: User[] | undefined;
  signupUpdate = { role: ["coach"] } as Signup;
  signupCreate = { role: ["coach"] } as Signup;

  passwordSetting: PasswordSetting | undefined;
  passwordSetting2: PasswordSetting | undefined;
  numberUppercase = 0;
  numberLowercase = 0;
  numberDigit = 0;
  numberSpetial = 0;
  numberCharacter = 0;

  constructor(private loginService: LoginService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginService.readPasswordSetting().subscribe((data: PasswordSetting) => {
      if (data) {
        this.passwordSetting = data;
        this.passwordSetting2 = data;

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

    this.loginService.readUsers().subscribe((data: User[]) => {
      if (data) {
        this.users = data;
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
      }
    });
  }

  createUser() {
    this.authService.register(this.signupCreate).subscribe((data: SignupResponse) => {
      if (data) {
        alert(data.message);
        this.signupCreate = { role: ["coach"] } as Signup;
        this.ngOnInit();
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
      }
    });
  }

  updateUser() {
    this.loginService.updateUser(this.signupUpdate.id, this.signupUpdate).subscribe((data: SignupResponse) => {
      if (data) {
        alert(data.message);
        this.signupUpdate = { role: ["coach"] } as Signup;
        this.ngOnInit();
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
      }
    });
  }

  deleteUser(userId: number) {
    this.loginService.deleteUser(userId).subscribe((data: SignupResponse) => {
      if (data) {
        alert(data.message);
        this.ngOnInit();
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
      }
    });
  }

  setUpdateUser(user: User) {
    this.signupUpdate.id = user.id
    this.signupUpdate.username = user.username
    this.signupUpdate.email = user.email
    const role = user.roles[0].name.toLowerCase().split("_")[1]
    this.signupUpdate.role = [role]
  }
}
