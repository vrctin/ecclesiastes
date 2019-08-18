export interface DetailModel {
  currentTurn: number,
  currentlyHeldProvince: string,

  currentTarget: string,
  lastTarget: string,

  showAttackArrow: boolean,
  canAttack: boolean,
  isHoldingProvince: boolean,
  
  arrowCoordinates: {
    x1: number,
    x2: number,
    y1: number,
    y2: number
  }
}
