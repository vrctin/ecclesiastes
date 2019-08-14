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

}
