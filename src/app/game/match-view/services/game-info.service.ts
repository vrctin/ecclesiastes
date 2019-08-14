import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GameInfoService {

  testBool: boolean = false;

  public spitTest(): void {
    console.log(this.testBool);
  }

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any>{
    return this.http.get("assets/game-vars.json");
  }
}
