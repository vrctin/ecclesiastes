import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit, OnChanges {

  @Input() selectedProvince: string;
  @Input() attacking: boolean;
  @Input() target: string;

  provinceInfo = 'Idle!';
  constructor() {}

  ngOnChanges(){
    this.provinceInfo = "On " + this.selectedProvince + ", attcking: " + this.attacking + ", target: " + this.target;
  }

  ngOnInit() {
  }

}
