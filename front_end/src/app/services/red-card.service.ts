import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedCard } from '../models/redcard';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RedCardService {
  private redCardUrl = environment.apiUrl + '/api/redcards';

  constructor(private http: HttpClient) { }

  getRedCards() {
    return this.http.get<RedCard[]>(this.redCardUrl);
  }

  createYellowCard(redCard: RedCard) {
    return this.http.post<String>(this.redCardUrl, redCard, { responseType: 'text/plain' as 'json' });
  }

  getRedCardsByGameId(id: number) {
    return this.http.get<RedCard[]>(this.redCardUrl + "/gameId/" + id);
  }
}
