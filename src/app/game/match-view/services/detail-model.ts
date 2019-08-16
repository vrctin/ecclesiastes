export interface DetailModel {
  isHoldingProvince: boolean,
  currentlyHeldProvince: string,

  isTargeting: boolean,
  lastTarget: string,
  showAttackArrow: boolean;
  arrowCoordinates: {
    x1: number,
    x2: number,
    y1: number,
    y2: number
  }
}
