import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Goal } from 'src/app/models/goal';
import { Player } from 'src/app/models/player';
import { RedCard } from 'src/app/models/redcard';
import { Team } from 'src/app/models/team';
import { TournamentTeam } from 'src/app/models/tournamentteam';
import { YellowCard } from 'src/app/models/yellowcard';
import { GameService } from 'src/app/services/game.service';
import { GoalService } from 'src/app/services/goal.service';
import { PlayerService } from 'src/app/services/player.service';
import { RedCardService } from 'src/app/services/red-card.service';
import { TeamService } from 'src/app/services/team.service';
import { TournamentTeamService } from 'src/app/services/tournament-team.service';
import { YellowCardService } from 'src/app/services/yellow-card.service';

@Component({
  selector: 'app-referee-goal',
  templateUrl: './referee-goal.component.html',
  styleUrls: ['./referee-goal.component.css']
})
export class RefereeGoalComponent {
  gamesToday: Game[] | undefined;
  tournamentTeamsToday: TournamentTeam[] | undefined;
  teamsToday: Team[] | undefined;

  playersA: Player[] | undefined;
  playersB: Player[] | undefined;
  goals: Goal[] | undefined;
  yellowCards: YellowCard[] | undefined;
  redCards: RedCard[] | undefined;

  goalCreate = {} as Goal;
  yellowCardCreate = {} as YellowCard;
  redCardCreate = {} as RedCard;

  teamA: Team | undefined;
  teamB: Team | undefined;

  gameCurrent: Game | undefined;

  location: google.maps.LatLngLiteral | undefined;

  goalsA = 0;
  goalsB = 0;

  constructor(private gameService: GameService, private teamService: TeamService, private playerService: PlayerService, private goalService: GoalService, private yellowCardService: YellowCardService, private redCardService: RedCardService, private tournamentTeamService: TournamentTeamService) { }

  ngOnInit() {
    this.gameCurrent = this.gameService.getGameCurrent();

    this.gameService.getGamesTodayByRefereeId().subscribe((data: Game[]) => {
      this.gamesToday = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });

    this.tournamentTeamService.getTournamentTeamsTodayByRefereeId().subscribe((data: TournamentTeam[]) => {
      this.tournamentTeamsToday = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });

    this.teamService.getTeamsTodayByRefereeId().subscribe((data: Team[]) => {
      this.teamsToday = data;
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });

    if (this.gameCurrent !== undefined) {
      this.teamService.getTeamsByTournamentTeamId(this.gameCurrent.tournamentTeamAId).subscribe((data: Team) => {
        this.teamA = data;
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });

      this.teamService.getTeamsByTournamentTeamId(this.gameCurrent.tournamentTeamBId).subscribe((data: Team) => {
        this.teamB = data;
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });

      this.playerService.getPlayersByTournamentTeamId(this.gameCurrent.tournamentTeamAId).subscribe((data: Player[]) => {
        this.playersA = data;
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });

      this.playerService.getPlayersByTournamentTeamId(this.gameCurrent.tournamentTeamBId).subscribe((data: Player[]) => {
        this.playersB = data;
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });

      this.goalService.getGoalsByGameId(this.gameCurrent.id!).subscribe((data: Goal[]) => {
        this.goals = data;
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });

      this.yellowCardService.getYellowCardsByGameId(this.gameCurrent.id!).subscribe((data: YellowCard[]) => {
        this.yellowCards = data;
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });

      this.redCardService.getRedCardsByGameId(this.gameCurrent.id!).subscribe((data: RedCard[]) => {
        this.redCards = data;
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });

      this.goalCreate.gameId = this.gameCurrent.id!;
      this.yellowCardCreate.gameId = this.gameCurrent.id!;
      this.redCardCreate.gameId = this.gameCurrent.id!;
    }
  }

  showLocation(game: Game) {
    this.location = {
      lat: game.latitude,
      lng: game.longitude,
    };
  }

  setGame(game: Game) {
    this.gameService.setGameCurrent(game);
    this.ngOnInit();
  }

  createGoalPlayer(player: Player) {
    this.goalCreate.playerId = player.id!;
    this.goalService.createGoal(this.goalCreate).subscribe((data: String) => {
      alert(data);
      this.goalCreate = {} as Goal;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  createYellowCard(player: Player) {
    this.yellowCardCreate.playerId = player.id!;
    this.yellowCardService.createYellowCard(this.yellowCardCreate).subscribe((data: String) => {
      alert(data);
      this.yellowCardCreate = {} as YellowCard;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  createRedCard(player: Player) {
    this.redCardCreate.playerId = player.id!;
    this.redCardService.createYellowCard(this.redCardCreate).subscribe((data: String) => {
      alert(data);
      this.redCardCreate = {} as RedCard;
      this.ngOnInit();
    }, (error: HttpErrorResponse) => {
      alert(error.error);
    });
  }

  getTeamName(tournamentTeamId: number) {
    const teamId = this.tournamentTeamsToday?.find(tournamentTeam => tournamentTeam.id == tournamentTeamId)?.teamId;
    return this.teamsToday?.find(team => team.id == teamId)?.name;
  }

  getTeamProfile(tournamentTeamId: number) {
    const teamId = this.tournamentTeamsToday?.find(tournamentTeam => tournamentTeam.id == tournamentTeamId)?.teamId;
    return this.teamsToday?.find(team => team.id == teamId)?.profile;
  }

  getPlayerName(playerId: number) {
    const namePlayerA = this.playersA?.find(player => player.id == playerId)?.name;
    const namePlayerB = this.playersB?.find(player => player.id == playerId)?.name;
    if (namePlayerA !== undefined) {
      return namePlayerA;
    }
    if (namePlayerB !== undefined) {
      return namePlayerB;
    }
    return "";
  }

  getPlayerProfile(playerId: number) {
    const profilePlayerA = this.playersA?.find(player => player.id == playerId)?.profile;
    const profilePlayerB = this.playersB?.find(player => player.id == playerId)?.profile;
    if (profilePlayerA !== undefined) {
      return profilePlayerA;
    }
    if (profilePlayerB !== undefined) {
      return profilePlayerB;
    }
    return "";
  }

  getPlayerTeamName(playerId: number) {
    const teamIdPlayerA = this.playersA?.find(player => player.id == playerId)?.teamId;
    const teamIdPlayerB = this.playersB?.find(player => player.id == playerId)?.teamId;
    if (teamIdPlayerA !== undefined) {
      return this.teamsToday?.find(team => team.id == teamIdPlayerA)?.name;
    }
    if (teamIdPlayerB !== undefined) {
      return this.teamsToday?.find(team => team.id == teamIdPlayerB)?.name;
    }
    return "";
  }

  getPlayerTeamProfile(playerId: number) {
    const teamIdPlayerA = this.playersA?.find(player => player.id == playerId)?.teamId;
    const teamIdPlayerB = this.playersB?.find(player => player.id == playerId)?.teamId;
    if (teamIdPlayerA !== undefined) {
      return this.teamsToday?.find(team => team.id == teamIdPlayerA)?.profile;
    }
    if (teamIdPlayerB !== undefined) {
      return this.teamsToday?.find(team => team.id == teamIdPlayerB)?.profile;
    }
    return "";
  }

  saveGameWinner() {
    if (this.gameCurrent == undefined) {
      alert("Selecte a game");
      return;
    }
    if (this.goalsA > this.goalsB) {
      this.gameService.updateGameWinner(this.gameCurrent.id!, this.gameCurrent?.tournamentTeamAId).subscribe((data: String) => {
        alert(data);
        this.ngOnInit();
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });
    }

    if (this.goalsA < this.goalsB) {
      this.gameService.updateGameWinner(this.gameCurrent.id!, this.gameCurrent?.tournamentTeamAId).subscribe((data: String) => {
        alert(data);
        this.ngOnInit();
      }, (error: HttpErrorResponse) => {
        alert(error.error);
      });
    }
  };

  setGameWinner() {
    this.goalsA = 0;
    this.goalsB = 0;
    this.goals?.forEach((goal) => {
      this.playersA?.forEach((player) => {
        if (goal.playerId == player.id) {
          this.goalsA += goal.goal;
        }
      });
      this.playersB?.forEach((player) => {
        if (goal.playerId == player.id) {
          this.goalsB += goal.goal;
        }
      });
    });
    console.log(`a: ${this.goalsA}, b ${this.goalsB}`);
  }
}
