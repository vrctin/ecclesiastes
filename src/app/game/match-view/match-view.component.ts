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

  public beforePan = function(oldPan, newPan){
    var stopHorizontal = false;
    var stopVertical = false;
    var gutterWidth = 400;
    var gutterHeight = 400;
    // Computed variables
    var sizes = this.getSizes();
    var leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
    var rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
    var topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
    var bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

    var customPan = {};
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));

    return customPan;
  };

  ngAfterViewInit(){
    var panZoomMap = svgPanZoom('#gameMap', {
      panEnabled: true,
      controlIconsEnabled: true,
      zoomEnabled: true,
      contain: true,
      center: true,
      fit: true,
      refreshRate: 'auto',
      zoomScaleSensitivity: 0.6,
      beforePan: this.beforePan
    });
  }

}
