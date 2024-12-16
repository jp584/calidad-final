import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { GameService } from 'src/app/services/game.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Team } from 'src/app/models/team';
import { Game } from 'src/app/models/game';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { TournamentTeamService } from 'src/app/services/tournament-team.service';
import { TournamentTeam } from 'src/app/models/tournamentteam';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-coach-game',
  templateUrl: './coach-game.component.html',
  styleUrls: ['./coach-game.component.css']
})
export class CoachGameComponent {
  tournaments: Tournament[] | undefined;
  tournamentSelected: Tournament | undefined;
  gamesSelected: Game[] | undefined;
  tournamentTeamsSelected: TournamentTeam[] | undefined;
  teamsSelected: Team[] | undefined;
  user: User | undefined;

  location: google.maps.LatLngLiteral | undefined;

  constructor(private tournamentService: TournamentService, private gameService: GameService, private loginService: LoginService, private tournamentTeamService: TournamentTeamService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.tournamentService.getTournamentsByUserId().subscribe((data: Tournament[]) => {
      this.tournaments = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  showTournamentGames(tournament: Tournament) {
    this.gameService.getGamesByTournamentId(tournament.id!).subscribe((data: Game[]) => {
      this.gamesSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
    this.tournamentTeamService.getTournamentTeamsByTournamentId(tournament.id!).subscribe((data: TournamentTeam[]) => {
      this.tournamentTeamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
    this.teamService.getTeamsByTournamentId(tournament.id!).subscribe((data: Team[]) => {
      this.teamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  showLocation(game: Game) {
    this.location = {
      lat: game.latitude,
      lng: game.longitude,
    };
  }

  setReadUser(userId: number) {
    this.loginService.readUser(userId).subscribe((data: User) => {
      this.user = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  getTeamName(tournamentTeamId: number) {
    const teamId = this.tournamentTeamsSelected?.find(tournamentTeam => tournamentTeam.id == tournamentTeamId)?.teamId;
    return this.teamsSelected?.find(team => team.id == teamId)?.name;
  }

  getTeamProfile(tournamentTeamId: number) {
    const teamId = this.tournamentTeamsSelected?.find(tournamentTeam => tournamentTeam.id == tournamentTeamId)?.teamId;
    return this.teamsSelected?.find(team => team.id == teamId)?.profile;
  }
}
