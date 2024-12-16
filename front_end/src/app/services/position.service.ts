import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from '../models/position';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private positionUrl = environment.apiUrl + '/api/positions';

  constructor(private http: HttpClient) { }

  getPositions() {
    return this.http.get<Position[]>(this.positionUrl);
  }
}
