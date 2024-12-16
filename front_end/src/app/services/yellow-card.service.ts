import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YellowCard } from '../models/yellowcard';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class YellowCardService {
  private yellowCardUrl = environment.apiUrl + '/api/yellowcards';

  constructor(private http: HttpClient) { }

  getYellowCards() {
    return this.http.get<YellowCard[]>(this.yellowCardUrl);
  }

  createYellowCard(yellowCard: YellowCard) {
    return this.http.post<String>(this.yellowCardUrl, yellowCard, { responseType: 'text/plain' as 'json' });
  }

  getYellowCardsByGameId(id: number) {
    return this.http.get<YellowCard[]>(this.yellowCardUrl + "/gameId/" + id);
  }
}
