import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { TsService } from 'src/app/services/ts.service';

@Component({
  selector: 'app-coach-team',
  templateUrl: './coach-team.component.html',
  styleUrls: ['./coach-team.component.css']
})
export class CoachTeamComponent {
  teams: Team[] | undefined;
  teamCreate = {} as Team;
  teamUpdate = {} as Team;

  selectedFile: File | undefined;
  date = new Date();

  constructor(private teamService: TeamService, private tsService: TsService) { }

  ngOnInit(): void {
    this.teamService.getTeamsByUserId().subscribe((data: Team[]) => {
      this.teams = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  createTeam() {
    if (this.selectedFile == undefined) {
      alert("Select a file");
      return;
    }
    const formData = new FormData();
    formData.append("name", this.teamCreate.name);
    formData.append('profile', this.selectedFile, this.selectedFile.name);
    formData.append("foundation", this.teamCreate.foundation);
    formData.append("userId", this.tsService.getUser().id);

    this.teamService.createTeam(formData).subscribe((data: String) => {
      alert(data);
      this.teamCreate = {} as Team;
      this.selectedFile = undefined;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
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
      this.selectedFile = undefined;
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }
}
