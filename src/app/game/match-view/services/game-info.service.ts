import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailModel } from './detail-model';

@Injectable({
  providedIn: 'root'
})

export class GameInfoService {
  sessionData: DetailModel = {
    isHoldingProvince: false,
    currentlyHeldProvince:'',

    isTargeting: false,
    lastTarget: '',
    showAttackArrow: false,
    arrowCoordinates: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    }
  };

  printData(){
    console.log(this.sessionData);
  }
  constructor() {}

}
