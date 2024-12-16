import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-referee-team',
  templateUrl: './referee-team.component.html',
  styleUrls: ['./referee-team.component.css']
})
export class RefereeTeamComponent {
  teams: Team[] | undefined;
  user: User | undefined;

  constructor(private teamService: TeamService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  setReadUser(userId: number) {
    this.loginService.readUser(userId).subscribe((data: User) => {
      this.user = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }
}
