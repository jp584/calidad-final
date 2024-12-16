import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Game } from '../models/game';
import { TsService } from './ts.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl = environment.apiUrl + '/api/games';
  private gameCurrent: Game | undefined;

  constructor(private http: HttpClient, private tsService: TsService) { }

  getGames() {
    return this.http.get<Game[]>(this.gameUrl);
  }

  createGame(game: Game) {
    return this.http.post<String>(this.gameUrl, game, { responseType: 'text/plain' as 'json' });
  }

  deleteGame(id: number) {
    return this.http.delete<String>(this.gameUrl + "/" + id, { responseType: 'text/plain' as 'json' });
  }

  getGamesByTournamentId(id: number) {
    return this.http.get<Game[]>(this.gameUrl + "/tournamentId/" + id);
  }

  getGamesTodayByRefereeId() {
    const id = this.tsService.getUser().id;
    return this.http.get<Game[]>(this.gameUrl + "/today/refereeId/" + id);
  }

  updateGameWinner(gameId: number, tournamentTeamId: number) {
    return this.http.delete<String>(this.gameUrl + "/" + gameId + "/winner/" + tournamentTeamId, { responseType: 'text/plain' as 'json' });
  }

  getGameCurrent() {
    return this.gameCurrent;
  }

  setGameCurrent(game: Game) {
    this.gameCurrent = game;
  }
}
