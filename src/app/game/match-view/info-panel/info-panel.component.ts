import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { GameInfoService } from './../services/game-info.service';
@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {
  constructor(private info: GameInfoService) {}
  @Input() quickfix: any;

  triggerUpdate(){
  }

  ngDoCheck(){
    this.triggerUpdate();
  }

  ngOnInit() {
    this.triggerUpdate();
  }

}
