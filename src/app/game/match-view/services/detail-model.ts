export interface DetailModel {
  currentTurn: number,
  isHoldingProvince: boolean,
  currentlyHeldProvince: string,

  currentTarget: string,
  lastTarget: string,
  showAttackArrow: boolean;
  arrowCoordinates: {
    x1: number,
    x2: number,
    y1: number,
    y2: number
  }
}
