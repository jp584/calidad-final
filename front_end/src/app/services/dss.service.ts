import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';
import { environment } from 'src/environments/environment.prod';
import { TsService } from './ts.service';
import { Player } from '../models/player';
import { DssPlayerGoal, DssPlayerRedCard, DssPlayerYellowCard, DssTeamWinner } from '../models/dss';

@Injectable({
  providedIn: 'root'
})
export class DssService {
  private dssUrl = environment.apiUrl + '/api/dss';

  constructor(private http: HttpClient, private tsService: TsService) { }

  getTeamWinnerCountByUserId() {
    const id = this.tsService.getUser().id
    return this.http.get<DssTeamWinner[]>(this.dssUrl + "/teamWinnerCount/userId/" + id);
  }

  getPlayerGoalCountByUserId() {
    const id = this.tsService.getUser().id
    return this.http.get<DssPlayerGoal[]>(this.dssUrl + "/playerGoalCount/userId/" + id);
  }

  getPlayerRedCardCountByUserId() {
    const id = this.tsService.getUser().id
    return this.http.get<DssPlayerRedCard[]>(this.dssUrl + "/playerRedCardCount/userId/" + id);
  }

  getPlayerYellowCardCountByUserId() {
    const id = this.tsService.getUser().id
    return this.http.get<DssPlayerYellowCard[]>(this.dssUrl + "/playerYellowCardCount/userId/" + id);
  }

  getTeamWinnerCount() {
    return this.http.get<DssTeamWinner[]>(this.dssUrl + "/teamWinnerCount");
  }

  getPlayerGoalCount() {
    return this.http.get<DssPlayerGoal[]>(this.dssUrl + "/playerGoalCount");
  }

  getPlayerRedCardCount() {
    return this.http.get<DssPlayerRedCard[]>(this.dssUrl + "/playerRedCardCount");
  }

  getPlayerYellowCardCount() {
    return this.http.get<DssPlayerYellowCard[]>(this.dssUrl + "/playerYellowCardCount");
  }
}
