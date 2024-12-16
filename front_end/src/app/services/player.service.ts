import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { environment } from 'src/environments/environment.prod';
import { TsService } from './ts.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerUrl = environment.apiUrl + '/api/players';

  constructor(private http: HttpClient, private tsService: TsService) { }

  getPlayers() {
    return this.http.get<Player[]>(this.playerUrl);
  }

  createPlayer(formData: FormData) {
    return this.http.post<String>(this.playerUrl, formData, { responseType: 'text/plain' as 'json' });
  }

  updatePlayer(id: number, formData: FormData) {
    return this.http.put<String>(this.playerUrl + "/" + id, formData, { responseType: 'text/plain' as 'json' });
  }

  deletePlayer(id: number) {
    return this.http.delete<String>(this.playerUrl + "/" + id, { responseType: 'text/plain' as 'json' });
  }

  getPlayersByUserId() {
    const id = this.tsService.getUser().id;
    return this.http.get<Player[]>(this.playerUrl + "/userId/" + id);
  }

  getPlayersByTournamentTeamId(id: number) {
    return this.http.get<Player[]>(this.playerUrl + "/tournamentTeamId/" + id);
  }
}
