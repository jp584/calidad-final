import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Player } from 'src/app/models/player';
import { Position } from 'src/app/models/position';
import { Team } from 'src/app/models/team';
import { PlayerService } from 'src/app/services/player.service';
import { PositionService } from 'src/app/services/position.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-coach-player',
  templateUrl: './coach-player.component.html',
  styleUrls: ['./coach-player.component.css']
})
export class CoachPlayerComponent {
  players: Player[] | undefined;
  teams: Team[] | undefined;
  positions: Position[] | undefined;

  playerCreate = {} as Player;
  playerUpdate = {} as Player;

  selectedFile: File | undefined;
  date = new Date();

  constructor(private playerService: PlayerService, private teamService: TeamService, private positionService: PositionService) { }

  ngOnInit() {
    this.playerService.getPlayersByUserId().subscribe((data: Player[]) => {
      this.players = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.teamService.getTeamsByUserId().subscribe((data: Team[]) => {
      this.teams = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.positionService.getPositions().subscribe((data: Position[]) => {
      this.positions = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  createPlayer() {
    if (this.selectedFile == undefined) {
      alert("Select a file");
      return;
    }
    const formData = new FormData();
    formData.append("name", this.playerCreate.name);
    formData.append('profile', this.selectedFile, this.selectedFile.name);
    formData.append("ci", this.playerCreate.ci);
    formData.append("birthdate", this.playerCreate.birthdate);
    formData.append("positionId", this.playerCreate.positionId.toString());
    formData.append("teamId", this.playerCreate.teamId.toString());

    this.playerService.createPlayer(formData).subscribe((data: String) => {
      alert(data);
      this.playerCreate = {} as Player;
      this.selectedFile = undefined;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  updatePlayer() {
    if (this.selectedFile == undefined) {
      alert("Select a file");
      return;
    }
    const formData = new FormData();
    formData.append("name", this.playerUpdate.name);
    formData.append('profile', this.selectedFile, this.selectedFile.name);
    formData.append("ci", this.playerUpdate.ci);
    formData.append("birthdate", this.playerUpdate.birthdate);
    formData.append("positionId", this.playerUpdate.positionId.toString());
    formData.append("teamId", this.playerUpdate.teamId.toString());

    this.playerService.updatePlayer(this.playerUpdate.id!, formData).subscribe((data: String) => {
      alert(data);
      this.playerUpdate = {} as Player;
      this.selectedFile = undefined;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  deletePlayer(playerId: number) {
    this.playerService.deletePlayer(playerId).subscribe((data: String) => {
      alert(data);
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  setUpdatePlayer(player: Player) {
    this.playerUpdate = player;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  getPosition(id: number) {
    return this.positions?.find(position => position.id == id)?.name;
  }
}
