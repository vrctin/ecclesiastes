import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as svgPanZoom from "svg-pan-zoom";
import { GameInfoService } from "./services/game-info.service";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})

export class MatchViewComponent implements OnInit {
  public currentlyOnProvince = false;
  public currentDownProvince = '';
  public currentUpProvince = '';
  public showArrow = false;
  public arrowCoords = {};

  @ViewChild('gameMap', { static: false }) scene: ElementRef;

  public provinceIDs = ["MT_NO", "MT_CE", "MT_SO", "MT_SE", "MT_GO"];

  // Click events
  @HostListener('mousedown', ['$event'])
  onMousedown($event){
    console.log("Holding " + $event.srcElement.id);
    if(this.isProvince($event)){
      this.showArrow = true;

      this.panZoomMap.disablePan();

      // Data updates
      this.currentlyOnProvince = true;
      this.currentDownProvince = $event.srcElement.id;
    } else {
      this.currentlyOnProvince = false;
      this.currentDownProvince = $event.srcElement.id;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMousemove($event){
    if(this.currentlyOnProvince && this.currentDownProvince && this.isProvince($event)){
      let originBox = this.fetchBBox(this.currentDownProvince);
      let targetBox = this.fetchBBox($event.srcElement.id);

      this.updateArrow(originBox, targetBox);
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseup($event){
    // Data updates
    this.currentlyOnProvince = false;
    this.showArrow = false;
    this.panZoomMap.enablePan();

    if(this.isProvince($event)){
      this.currentUpProvince = $event.srcElement.id;

      if(this.currentDownProvince && this.currentUpProvince){
        let originBox = this.fetchBBox(this.currentDownProvince);
        let targetBox = this.fetchBBox(this.currentUpProvince);
        this.updateArrow(originBox, targetBox);
      }
    }
  }

  updateArrow(originBox: any, targetBox: any): void {
    this.arrowCoords = this.getCenterValues(originBox, targetBox);
  }

  // Util functions
  isProvince(event: any){
    return this.provinceIDs.indexOf(event.srcElement.id)!=-1;
  }

  getCenterValues(first: any, second: any){
    return {
      x1: first.x + first.width/2,
      y1: first.y + first.height/2,
      x2: second.x + second.width/2,
      y2: second.y + second.height/2
    }
  }

  fetchBBox(id: any){
    return (<any>document.getElementById(id)).getBBox();
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
      dblClickZoomEnabled: false,
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
