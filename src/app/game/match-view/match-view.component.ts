import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import panzoom from "panzoom";

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})
export class MatchViewComponent implements OnInit {
  @ViewChild('gameMap', { static: false }) scene: ElementRef;
  panZoomController;
  zoomLevels: number[];


  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    this.currentZoomLevel = this.zoomLevels[4];
    this.panZoomController = panzoom(this.scene.nativeElement);
  }

}
