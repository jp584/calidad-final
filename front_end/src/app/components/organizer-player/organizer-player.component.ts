import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Player } from 'src/app/models/player';
import { Position } from 'src/app/models/position';
import { Team } from 'src/app/models/team';
import { PlayerService } from 'src/app/services/player.service';
import { PositionService } from 'src/app/services/position.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-organizer-player',
  templateUrl: './organizer-player.component.html',
  styleUrls: ['./organizer-player.component.css']
})
export class OrganizerPlayerComponent {
  players: Player[] | undefined;
  positions: Position[] | undefined;

  constructor(private playerService: PlayerService, private positionService: PositionService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe((data: Player[]) => {
      this.players = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.positionService.getPositions().subscribe((data: Position[]) => {
      this.positions = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
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

  getPosition(id: number) {
    return this.positions?.find(position => position.id == id)?.name;
  }
}
