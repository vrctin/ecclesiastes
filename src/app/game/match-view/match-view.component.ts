import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as svgPanZoom from "svg-pan-zoom";
import { GameInfoService } from "./services/game-info.service";

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})

export class MatchViewComponent implements OnInit {
  private gameData = {};
  public currentlyOnProvince = this.gameData.mouseDownOnProvince;
  @ViewChild('gameMap', { static: false }) scene: ElementRef;

  $subscription;

  // Click events
  getId(event: any){
    console.log("Mousedown on province - currentlyOnProv = true");
    this.currentlyOnProvince = true;
  }

  check(){
    console.log("Lifted click - currentlyOnProv = false");
    this.currentlyOnProvince = false;
  }

  // De tinut minte ca se poate asa ceva, lol
  @HostListener('mousedown')
  onMousedown(){
    if(this.currentlyOnProvince){
      console.log("Mousedown event detected & is corrently on prov!");
      this.panZoomMap.disablePan();
      //this.panZoomMap.updateBBox();
    } else {
      this.panZoomMap.enablePan();
    }
  }

  @HostListener('mouseup')
  onMouseup(){
    console.log("Mouseup event detected, reactivating pan!");
    this.panZoomMap.enablePan();
    //this.panZoomMap.reset();

  }

  // Constructor & Lifehooks
  constructor(private gameInfoService: GameInfoService) {}

  ngOnInit() {
    this.$subscription = this.gameInfoService.getJsonData().subscribe(data => {
      this.gameData = data;
    })
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

    var customPan = {};
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));

    return customPan;
  };
}
