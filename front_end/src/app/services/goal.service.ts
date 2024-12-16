import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private gameUrl = environment.apiUrl + '/api/goals';

  constructor(private http: HttpClient) { }

  getGoals() {
    return this.http.get<Goal[]>(this.gameUrl);
  }

  createGoal(goal: Goal) {
    return this.http.post<String>(this.gameUrl, goal, { responseType: 'text/plain' as 'json' });
  }

  getGoalsByGameId(id: number) {
    return this.http.get<Goal[]>(this.gameUrl + "/gameId/" + id);
  }
}
