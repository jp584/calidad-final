import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Tournament } from 'src/app/models/tournament';
import { TournamentTeam } from 'src/app/models/tournamentteam';
import { TeamService } from 'src/app/services/team.service';
import { TournamentTeamService } from 'src/app/services/tournament-team.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-organizer-tournament',
  templateUrl: './organizer-tournament.component.html',
  styleUrls: ['./organizer-tournament.component.css']
})
export class OrganizerTournamentComponent {
  tournaments: Tournament[] | undefined;
  tournamentSelected: Tournament | undefined;
  teamsSelected: Team[] | undefined;

  tournamentCreate = {} as Tournament;
  tournamentUpdate = {} as Tournament;

  date = new Date();

  constructor(private tournamentService: TournamentService, private tournamentTeamService: TournamentTeamService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.tournamentService.getTournaments().subscribe((data: Tournament[]) => {
      this.tournaments = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  createTournament() {
    var number = this.tournamentCreate.number;
    while (number > 1) {
      number = number / 2;
    }
    if (number !== 1) {
      alert("Insert a correct number of teams like: 2,4,8,16,32");
      return;
    }

    this.tournamentService.createTournament(this.tournamentCreate).subscribe((data: String) => {
      alert(data);
      this.tournamentCreate = {} as Tournament;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error);
      }
    });
  }

  updateTournament() {
    this.tournamentService.updateTournament(this.tournamentUpdate.id!, this.tournamentUpdate).subscribe((data: String) => {
      alert(data);
      this.tournamentUpdate = {} as Tournament;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error);
      }
    });
  }

  deleteTournament(tournamentId: number) {
    this.tournamentService.deleteTournament(tournamentId).subscribe((data: String) => {
      alert(data);
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error);
      }
    });
  }

  deleteTournamentTeam(tournamentId: number, teamId: number) {
    this.tournamentTeamService.deleteTournamentTeam(tournamentId, teamId).subscribe((data: String) => {
      alert(data);
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  showTournamentTeams(tournament: Tournament) {
    this.tournamentSelected = tournament;
    this.teamService.getTeamsByTournamentId(tournament.id!).subscribe((data: Team[]) => {
      this.teamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  setUpdateTournament(tournament: Tournament) {
    this.tournamentUpdate = tournament;
  }
}
