import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as svgPanZoom from "svg-pan-zoom";
import { GameInfoService } from "./services/game-info.service";

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})

export class MatchViewComponent implements OnInit {
  public currentlyOnProvince = false;
  public currentDownProvince = '';

  @ViewChild('gameMap', { static: false }) scene: ElementRef;

  public provinceIDs = ["MT_NO", "MT_CE", "MT_SO", "MT_SE", "MT_GO"];

  // Click events
  isProvince(id: string){
    return this.provinceIDs.indexOf(event.srcElement.id)!=-1;
  }
  @HostListener('mousedown', event)

  onMousedown(){
    console.log("Mousedown on " + event.srcElement.id);
    if(this.isProvince(event)){
      this.panZoomMap.disablePan();

      // Data updates
      this.currentlyOnProvince = true;
      this.currentDownProvince = event.srcElement.id;
    }
  }

  @HostListener('mouseup', event)
  onMouseup(){
    this.panZoomMap.enablePan();
    console.log("Mouseup on " + event.srcElement.id);
    // Data updates
    //this.currentlyOnProvince = true;
    //this.currentDownProvince = event.srcElement.id;
  }

  @HostListener('mousemove')
  onMousemove(){

  }

  // Constructor & Lifehooks
  constructor(private gameInfoService: GameInfoService) {}

  ngOnInit() {}

  public panZoomMap;
  ngAfterViewInit(){
    console.log("After init");
    this.panZoomMap = svgPanZoom('#gameMap', {
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

  // Panzoom essentials
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

    var customPan = {
      x: 0,
      y: 0
    };
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));

    return customPan;
  };
}
