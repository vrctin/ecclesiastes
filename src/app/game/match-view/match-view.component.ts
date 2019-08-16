import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as svgPanZoom from "svg-pan-zoom";
import { GameInfoService } from "./services/game-info.service";
import { DetailModel } from "./services/detail-model";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})

export class MatchViewComponent implements OnInit {
  @ViewChild('gameMap', { static: false }) scene: ElementRef;
  public provinceIDs = ["MT_NO", "MT_CE", "MT_SO", "MT_SE", "MT_GO"];

  public gameData: DetailModel = this.info.sessionData;

  // Click events
  @HostListener('mousedown', ['$event'])
  onMousedown($event){
    let eventId = $event.srcElement.id;
    let allPaths = Array.from((<any>document.getElementsByTagName('path')));

    if(this.isProvince($event)){
      this.panZoomMap.disablePan();

      // Setting outline
      this.restoreOutlines(allPaths, "black");
      this.setOutlineOfId(eventId, "red");

      // Append (bring to front)
      let currentElement = (<any>document.getElementById(eventId));
      this.bringElementToFront(currentElement);

      // Data updates
      this.gameData.isHoldingProvince = true;
      this.gameData.currentlyHeldProvince = eventId;
    } else {
      this.restoreOutlines(allPaths, "black");
      this.gameData.isHoldingProvince = false;
      this.gameData.currentlyHeldProvince = '';
    }
  }

  truthyDownValues():any {
    return this.gameData.isHoldingProvince && this.gameData.currentlyHeldProvince;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove($event){
    this.info.sessionData = this.gameData;
    //this.info.printData();

    if(this.truthyDownValues() && this.isProvince($event)){
      let eventId = $event.srcElement.id;
      if(eventId!=this.gameData.currentlyHeldProvince){
        this.gameData.isTargeting = eventId;
        this.gameData.showAttackArrow = true;
      }

      let originBox = this.fetchBBox(this.gameData.currentlyHeldProvince);
      let targetBox = this.fetchBBox(eventId);

      this.updateArrow(originBox, targetBox);
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseup($event){
    // Data updates
    this.gameData.isHoldingProvince = false;
    this.gameData.showAttackArrow = false;
    this.panZoomMap.enablePan();

    if(this.isProvince($event)){
      this.gameData.lastTarget = $event.srcElement.id;

      if(this.gameData.currentlyHeldProvince && this.gameData.lastTarget){
        let originBox = this.fetchBBox(this.gameData.currentlyHeldProvince);
        let targetBox = this.fetchBBox(this.gameData.lastTarget);
        this.updateArrow(originBox, targetBox);
      }
    }
  }

  updateArrow(originBox: any, targetBox: any): void {
    this.gameData.arrowCoordinates = this.getCenterValues(originBox, targetBox);
    this.adjustCoordinates(0.25);
  }

  adjustCoordinates(factor: number){
    let x_absFactor = Math.abs(this.gameData.arrowCoordinates.x1 - this.gameData.arrowCoordinates.x2)*factor;
    let y_absFactor = Math.abs(this.gameData.arrowCoordinates.y1 - this.gameData.arrowCoordinates.y2)*factor;

    if(this.gameData.arrowCoordinates.x1 < this.gameData.arrowCoordinates.x2){
      this.gameData.arrowCoordinates.x1 += x_absFactor;
      this.gameData.arrowCoordinates.x2 -= x_absFactor;
    } else {
      this.gameData.arrowCoordinates.x1 -= x_absFactor;
      this.gameData.arrowCoordinates.x2 += x_absFactor;
    }

    if(this.gameData.arrowCoordinates.y1 < this.gameData.arrowCoordinates.y2){
      this.gameData.arrowCoordinates.y1 += y_absFactor;
      this.gameData.arrowCoordinates.y2 -= y_absFactor;
    } else {
      this.gameData.arrowCoordinates.y1 -= y_absFactor;
      this.gameData.arrowCoordinates.y2 += y_absFactor;
    }
  }

  // Util functions
  bringElementToFront(element: any){
    let parent = element.parentNode;
    parent.removeChild(element);
    parent.appendChild(element);
  }

  setOutlineOfId(provinceId: any, color: string){
    document.getElementById(provinceId).style.stroke = color;
  }

  restoreOutlines(paths: any[], color: string){
      var element;
      for(element of paths)
        if(element.id) document.getElementById(element.id).style.stroke = color;
  }

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
  constructor(private info: GameInfoService) {}

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
