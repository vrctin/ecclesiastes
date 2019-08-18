import { Component, Output, EventEmitter } from '@angular/core';
import { GameInfoService } from './../services/game-info.service';
@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent {
  constructor(private info: GameInfoService) {}
  @Output() endTurnCount = new EventEmitter();

  endTurnEmitter(){
    this.endTurnCount.emit(this.info.sessionData.currentTurn++)
  }
}
