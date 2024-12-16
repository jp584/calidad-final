import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PasswordSetting } from 'src/app/models/passwordsetting';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-organizer-password',
  templateUrl: './organizer-password.component.html',
  styleUrls: ['./organizer-password.component.css']
})
export class OrganizerPasswordComponent {
  passwordSetting: PasswordSetting | undefined;
  passwordSettingCreate = {} as PasswordSetting;
  passwordSettingValues = {
    numberFail: 0,
    numberCharacter: 0,
    numberUppercase: 0,
    numberLowercase: 0,
    numberDigit: 0,
    spetialCharacter: "!@#$&*",
    numberSpetial: 0,
    expireDate: ""
  };

  date = new Date();

  constructor(private loginService: LoginService) {

  }

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

        this.passwordSettingValues.numberUppercase = Number(data.pattern.substring(indexUpercaseLeft + 1, indexUpercaseRight));
        this.passwordSettingValues.numberLowercase = Number(data.pattern.substring(indexLowercaseLeft + 1, indexLowercaseRight));
        this.passwordSettingValues.numberDigit = Number(data.pattern.substring(indexDigitLeft + 1, indexDigitRight));
        this.passwordSettingValues.numberSpetial = Number(data.pattern.substring(indexSpetialLeft + 1, indexSpetialRight));
        this.passwordSettingValues.numberCharacter = Number(data.pattern.substring(indexNumberLeft + 1, indexNumberRight));

        this.passwordSettingValues.numberFail = data.numberFail;
        this.passwordSettingValues.expireDate = data.expireDate;
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
      }
    });
  }

  createPasswordSetting() {
    var regexPasswordPattern = `^(?=(.*[A-Z]){${this.passwordSettingValues.numberUppercase},})(?=(.*[a-z]){${this.passwordSettingValues.numberLowercase},})(?=(.*[0-9]){${this.passwordSettingValues.numberDigit},})` + `(?=(.*[${this.passwordSettingValues.spetialCharacter}]){${this.passwordSettingValues.numberSpetial},})` + `.{${this.passwordSettingValues.numberCharacter},}$`;
    this.passwordSettingCreate.numberFail = this.passwordSettingValues.numberFail;
    this.passwordSettingCreate.pattern = regexPasswordPattern;
    this.passwordSettingCreate.expireDate = this.passwordSettingValues.expireDate;
    this.loginService.createPasswordSetting(this.passwordSettingCreate).subscribe((data: PasswordSetting) => {
      if (data) {
        alert("Success: setting password configuration");
        this.passwordSetting = data;
        this.passwordSettingCreate = {} as PasswordSetting;
        this.ngOnInit();
      }
    }, (error: HttpErrorResponse) => {
      if (error) {
        this.passwordSettingCreate = {} as PasswordSetting;
        alert(error.error.message);
      }
    });
  }
}
