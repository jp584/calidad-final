import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Tournament } from 'src/app/models/tournament';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-referee-tournament',
  templateUrl: './referee-tournament.component.html',
  styleUrls: ['./referee-tournament.component.css']
})
export class RefereeTournamentComponent {
  tournaments: Tournament[] | undefined;
  teamsSelected: Team[] | undefined;

  constructor(private tournamentService: TournamentService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.tournamentService.getTournamentsByRefereeId().subscribe((data: Tournament[]) => {
      this.tournaments = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  showTournamentTeams(tournament: Tournament) {
    this.teamService.getTeamsByTournamentId(tournament.id!).subscribe((data: Team[]) => {
      this.teamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }
}
