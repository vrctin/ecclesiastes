import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailModel } from './detail-model';

@Injectable({
  providedIn: 'root'
})

export class GameInfoService {
  sessionData: DetailModel = {
    currentTurn: 0,
    isHoldingProvince: false,
    currentlyHeldProvince:'',

    currentTarget: '',
    lastTarget: '',
    showAttackArrow: false,
    arrowCoordinates: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    }
  };

  public currentTurnEvents = [];

  resetTurnData(){
    console.log("Events of turn " + this.sessionData.currentTurn);
    for(var element of this.currentTurnEvents) console.log(element);

    this.currentTurnEvents = [];
    this.sessionData.isHoldingProvince = false;
    this.sessionData.currentlyHeldProvince = '';
    this.sessionData.currentTarget = '';
    this.sessionData.lastTarget = '';
    this.sessionData.showAttackArrow = false;
  }

  printData(){
    console.log(this.sessionData);
  }
  constructor() {}

}
