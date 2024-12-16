import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';
import { environment } from 'src/environments/environment.prod';
import { TsService } from './ts.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamUrl = environment.apiUrl + '/api/teams';

  constructor(private http: HttpClient, private tsService: TsService) { }

  getTeams() {
    return this.http.get<Team[]>(this.teamUrl);
  }

  createTeam(formData: FormData) {
    return this.http.post<String>(this.teamUrl, formData, { responseType: 'text/plain' as 'json' });
  }

  updateTeam(id: number, formData: FormData) {
    return this.http.put<String>(this.teamUrl + "/" + id, formData, { responseType: 'text/plain' as 'json' });
  }

  deleteTeam(id: number) {
    return this.http.delete<String>(this.teamUrl + "/" + id, { responseType: 'text/plain' as 'json' });
  }

  getTeamsByUserId() {
    const id = this.tsService.getUser().id
    return this.http.get<Team[]>(this.teamUrl + "/userId/" + id);
  }

  getTeamsByTournamentId(id: number) {
    return this.http.get<Team[]>(this.teamUrl + "/tournamentId/" + id);
  }

  getTeamsByTournamentTeamId(id: number) {
    return this.http.get<Team>(this.teamUrl + "/tournamentTeamId/" + id);
  }

  getTeamsTodayByRefereeId() {
    const id = this.tsService.getUser().id;
    return this.http.get<Team[]>(this.teamUrl + "/today/refereeId/" + id);
  }
}
