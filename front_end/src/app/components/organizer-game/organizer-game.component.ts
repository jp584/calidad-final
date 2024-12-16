import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Tournament } from 'src/app/models/tournament';
import { GameService } from 'src/app/services/game.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { TournamentTeam } from 'src/app/models/tournamentteam';
import { TournamentTeamService } from 'src/app/services/tournament-team.service';

@Component({
  selector: 'app-organizer-game',
  templateUrl: './organizer-game.component.html',
  styleUrls: ['./organizer-game.component.css']
})
export class OrganizerGameComponent {
  tournaments: Tournament[] | undefined;
  tournamentSelected: Tournament | undefined;
  gamesSelected: Game[] | undefined;
  tournamentTeamsSelected: TournamentTeam[] | undefined;
  teamsSelected: Team[] | undefined;

  users: User[] | undefined;
  user: User | undefined;

  gameCreate = {} as Game;

  center: google.maps.LatLngLiteral | undefined;
  location: google.maps.LatLngLiteral | undefined;
  place: google.maps.LatLng | undefined;

  options: google.maps.MapOptions = {
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  constructor(private tournamentService: TournamentService, private gameService: GameService, private teamService: TeamService, private loginService: LoginService, private tournamentTeamService: TournamentTeamService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.tournamentService.getTournaments().subscribe((data: Tournament[]) => {
      this.tournaments = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });

    this.loginService.readUsers().subscribe((data: User[]) => {
      this.users = data.filter((user) => { return user.roles[0].name === "ROLE_REFEREE" });
    }, (error: HttpErrorResponse) => {
      if (error) {
        alert(error.error.message);
      }
    });
  }

  createGame() {
    this.gameCreate.tournamentId = this.tournamentSelected!.id!
    this.gameCreate.latitude = this.place!.lat();
    this.gameCreate.longitude = this.place!.lng();

    this.gameService.createGame(this.gameCreate).subscribe((data: String) => {
      alert(data);
      this.gameCreate = {} as Game;
      this.ngOnInit()
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  deleteGame(gameId: number) {
    this.gameService.deleteGame(gameId).subscribe((data: String) => {
      alert(data);
      this.ngOnInit()
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  setTournamentSelected(tournament: Tournament) {
    this.tournamentSelected = tournament;
    this.tournamentTeamService.getTournamentTeamsByTournamentId(tournament.id!).subscribe((data: TournamentTeam[]) => {
      this.tournamentTeamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
    this.teamService.getTeamsByTournamentId(tournament.id!).subscribe((data: Team[]) => {
      this.teamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });

    // var numberTeams = this.tournamentSelected.number;
    // var breaks: number[] = [];
    // while (numberTeams > 1) {
    //   console.log("here")
    //   breaks.push(numberTeams / 2);
    //   numberTeams = numberTeams / 2;
    // }
    // var breaks2: number[] = [];
    // var actual = 0;
    // for (let i of breaks) {
    //   breaks2.push(actual + i);
    //   actual += i;
    // }
    // var counter = 1;
    // for (let aa of breaks2) {
    //   if (this.teamsSelected!.length <= aa) {
    //     this.gameCreate.round = counter
    //     break;
    //   } else {
    //     counter += 1;
    //   }
    // }
    this.gameCreate.round = 1;
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
      alert(error.error.message);
    });
    this.teamService.getTeamsByTournamentId(tournament.id!).subscribe((data: Team[]) => {
      this.teamsSelected = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  click(event: google.maps.MapMouseEvent) {
    this.place = event.latLng!
    console.log(this.place);
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
