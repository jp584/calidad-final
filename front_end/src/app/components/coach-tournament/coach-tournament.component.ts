import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Tournament } from 'src/app/models/tournament';
import { TournamentTeam } from 'src/app/models/tournamentteam';
import { TeamService } from 'src/app/services/team.service';
import { TournamentTeamService } from 'src/app/services/tournament-team.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-coach-tournament',
  templateUrl: './coach-tournament.component.html',
  styleUrls: ['./coach-tournament.component.css']
})
export class CoachTournamentComponent {
  tournaments: Tournament[] | undefined;
  teams: Team[] | undefined;
  tournamentSelected: Tournament | undefined;
  teamsSelected: Team[] | undefined;

  tournamentTeam = {} as TournamentTeam;

  constructor(private tournamentService: TournamentService, private teamService: TeamService, private tournamentTeamService: TournamentTeamService) { }

  ngOnInit(): void {
    this.tournamentService.getTournaments().subscribe((data: Tournament[]) => {
      this.tournaments = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.teamService.getTeamsByUserId().subscribe((data: Team[]) => {
      this.teams = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  createTournamentTeam() {
    this.tournamentTeamService.createTournament(this.tournamentTeam).subscribe((data: String) => {
      alert(data);
      this.tournamentTeam = {} as TournamentTeam;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  deleteTeamFromTournamentTeam(tournamentId: number, teamId: number) {
    this.tournamentTeamService.deleteTournamentTeam(tournamentId, teamId).subscribe((data: String) => {
      alert(data);
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  setTournamentTeam(tournamentId: number) {
    this.tournamentTeam.tournamentId = tournamentId;
  }

  showTournamentTeams(tournament: Tournament) {
    this.tournamentSelected = tournament;
    this.teamService.getTeamsByTournamentId(tournament.id!).subscribe((data: Team[]) => {
      this.teamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }
}
