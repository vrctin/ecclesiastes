import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as svgPanZoom from "svg-pan-zoom";

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})

export class MatchViewComponent implements OnInit {
  @ViewChild('gameMap', { static: false }) scene: ElementRef;

  constructor() {}
  ngOnInit() {
  }

  getId(event: any){
    console.log("Mouse down on element with id " + event.toElement.id)
  }

  ngAfterViewInit(){
    var panZoomMap = svgPanZoom('#gameMap', {
      panEnabled: true,
      controlIconsEnabled: true,
      zoomEnabled: true,
      contain: true,
      center: true,
      fit: true,
      refreshRate: 'auto',
      zoomScaleSensitivity: 0.6
    });
  }

}
