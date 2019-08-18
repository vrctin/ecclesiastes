import { Component, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { GameInfoService } from './../services/game-info.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css'],
  animations: [
    trigger('switchTurnCircleColor', [
      state('unmarked', style({
        backgroundColor: "#DFD9E2"
      })),
      state('marked', style({
        backgroundColor: "#100007"
      })),
      transition('unmarked=>marked', animate('250ms')),
      transition('marked=>unmarked', animate('250ms'))
    ]),
  ]
})
export class InfoPanelComponent {
  constructor(private info: GameInfoService) {}
  @Output() endTurnCount = new EventEmitter();

  endTurnEmitter(){
    this.endTurnCount.emit(this.info.sessionData.currentTurn++)
  }

  toMark = ['unmarked', 'unmarked', 'unmarked', 'unmarked', 'unmarked'];
  ngAfterContentChecked(){
    if(!this.info.currentTurnEvents.length)
      for(var i=0; i<this.toMark.length; i++) this.toMark[i]='unmarked';
    else
      for(var element in this.info.currentTurnEvents) this.toMark[element]='marked';
  }
}
