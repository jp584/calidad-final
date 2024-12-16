import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Tournament } from '../models/tournament';
import { TsService } from './ts.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournamentUrl = environment.apiUrl + '/api/tournaments';

  constructor(private http: HttpClient, private tsService: TsService) { }

  getTournaments() {
    return this.http.get<Tournament[]>(this.tournamentUrl);
  }

  createTournament(tournament: Tournament) {
    return this.http.post<String>(this.tournamentUrl, tournament, { responseType: 'text/plain' as 'json' });
  }

  updateTournament(id: number, tournament: Tournament) {
    return this.http.put<String>(this.tournamentUrl + "/" + id, tournament, { responseType: 'text/plain' as 'json' });
  }

  deleteTournament(id: number) {
    return this.http.delete<String>(this.tournamentUrl + "/" + id, { responseType: 'text/plain' as 'json' });
  }

  getTournamentsByUserId() {
    const id = this.tsService.getUser().id
    return this.http.get<Tournament[]>(this.tournamentUrl + "/userId/" + id);
  }

  getTournamentsByRefereeId() {
    const id = this.tsService.getUser().id
    return this.http.get<Tournament[]>(this.tournamentUrl + "/refereeId/" + id);
  }
}
