import { Component, OnInit } from '@angular/core';
import { PanZoomConfig, PanZoomAPI, PanZoomModel } from 'ng2-panzoom';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})
export class MatchViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public panzoomConfig: PanZoomConfig = new PanZoomConfig({
    zoomLevels: 10,
    scalePerZoomLevel: 2.0,
    zoomStepDuration: 0.2,
    freeMouseWheelFactor: 0.01,
    zoomToFitZoomLevelFactor: 0.9,
    dragMouseButton: 'left'
  });

}
