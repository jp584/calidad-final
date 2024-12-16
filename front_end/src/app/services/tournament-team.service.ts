import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { TournamentTeam } from '../models/tournamentteam';
import { TsService } from './ts.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentTeamService {

  private tournamentTeamUrl = environment.apiUrl + '/api/tournamentsteams';

  constructor(private http: HttpClient, private tsService: TsService) { }

  getTournamentTeams() {
    return this.http.get<TournamentTeam[]>(this.tournamentTeamUrl);
  }

  createTournament(tournamentTeam: TournamentTeam) {
    return this.http.post<String>(this.tournamentTeamUrl, tournamentTeam, { responseType: 'text/plain' as 'json' });
  }

  deleteTournamentTeam(tournamentId: number, teamId: number) {
    return this.http.delete<String>(this.tournamentTeamUrl + "/tournamentId/" + tournamentId + "/teamId/" + teamId, { responseType: 'text/plain' as 'json' });
  }

  getTournamentTeamsByTournamentId(tournamentId: number) {
    return this.http.get<TournamentTeam[]>(this.tournamentTeamUrl + "/tournamentId/" + tournamentId);
  }

  getTournamentTeamsTodayByRefereeId() {
    const id = this.tsService.getUser().id;
    return this.http.get<TournamentTeam[]>(this.tournamentTeamUrl + "/today/refereeId/" + id);
  }
}
