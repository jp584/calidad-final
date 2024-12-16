import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-organizer-team',
  templateUrl: './organizer-team.component.html',
  styleUrls: ['./organizer-team.component.css']
})
export class OrganizerTeamComponent {
  teams: Team[] | undefined;
  user: User | undefined;
  selectedFile: File | undefined;

  teamUpdate = {} as Team;

  date = new Date();

  constructor(private teamService: TeamService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  updateTeam() {
    if (this.selectedFile == undefined) {
      alert("Select a file");
      return;
    }

    const formData = new FormData();
    formData.append("name", this.teamUpdate.name);
    formData.append('profile', this.selectedFile, this.selectedFile.name);
    formData.append("foundation", this.teamUpdate.foundation);

    this.teamService.updateTeam(this.teamUpdate.id!, formData).subscribe((data: String) => {
      alert(data);
      this.teamUpdate = {} as Team;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  deleteTeam(teamId: number) {
    this.teamService.deleteTeam(teamId).subscribe((data: String) => {
      alert(data);
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  setUpdateTeam(team: Team) {
    this.teamUpdate = team;
  }

  setReadUser(userId: number) {
    this.loginService.readUser(userId).subscribe((data: User) => {
      this.user = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }
}
