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

  @ViewChild('gameMap', { static: false }) scene: ElementRef;

  public provinceIDs = ["MT_NO", "MT_CE", "MT_SO", "MT_SE", "MT_GO"];

  // Click events
  isProvince(event: any){
    return this.provinceIDs.indexOf(event.srcElement.id)!=-1;
  }

  @HostListener('mousedown', ['$event'])
  onMousedown($event){
    //console.log("Mousedown on " + $event.srcElement.id);
    if(this.isProvince($event)){
      this.panZoomMap.disablePan();

      // Data updates
      this.currentlyOnProvince = true;
      this.currentDownProvince = $event.srcElement.id;
    } else {
      this.currentlyOnProvince = false;
      this.currentDownProvince = $event.srcElement.id;
    }
  }

  getDistance(x1: number, x2:number, y1: number, y2: number): number{
    return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
  }

  getDegree(x1: number, x2: number, y1: number, y2: number): number{
    return Math.atan(Math.abs(y1-y2)/Math.abs(x1-x2))*180/Math.PI;
  }

  public transformParameter = '';
  @HostListener('mouseup', ['$event'])
  onMouseup($event){
    this.panZoomMap.enablePan();
    //console.log("Mouseup on " + $event.srcElement.id);
    // Data updates
    this.currentlyOnProvince = false;
    this.currentUpProvince = $event.srcElement.id;


    console.log("Down on: " + this.currentDownProvince);
    console.log("Up on: " + this.currentUpProvince);

    if(this.currentDownProvince && this.currentUpProvince){
      let downBox = (<any>document.getElementById(this.currentDownProvince)).getBBox();
      let upBox = (<any>document.getElementById(this.currentUpProvince)).getBBox();

      let centerPoints = this.getCenterValues(downBox, upBox);
      let degree = this.getDegree(centerPoints.x1, centerPoints.x2, centerPoints.y1, centerPoints.y2);

      this.transformParameter = this.getTransformParameter(degree)
      console.log(centerPoints);
    }
  }

  getTransformParameter(degree: number): string {
    return "rotate(" + degree + ")";
  }

  getCenterValues(first: any, second: any){
    return {
      x1: first.x + first.width/2,
      y1: first.y + first.height/2,
      x2: second.x + second.width/2,
      y2: second.y + second.height/2
    }
  }

  @HostListener('mousemove')
  onMousemove(){

  }

  // Constructor & Lifehooks
  constructor(private gameInfoService: GameInfoService) {}

  ngOnInit() {
    console.log("getDistance = " + this.getDistance(0, 2, 0, 2));
    console.log("getDegree = " + this.getDegree(0, 2, 0, 2));
  }

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
