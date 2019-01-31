import { Shape } from './Shape.js'

/* global PIXI */

export class Polygon extends Shape {
  constructor () {
    super()
    Object.assign(this.defaultState, {
      points: []
    })
  }

  initDisplay () {
    super.initDisplay()
    this.graphics.endFill()
  }

  updateDisplay (state, changed, globalData) {
    super.updateDisplay(state, changed, globalData)
    if (changed.lineWidth ||
      changed.lineColor ||
      changed.lineAlpha ||
      changed.fillColor ||
      changed.points) {
      this.graphics.clear()
      if (state.fillColor !== null) {
        this.graphics.beginFill(state.fillColor, state.fillAlpha)
      }

      this.graphics.lineStyle(globalData.atLeastOnePixel(state.lineWidth), state.lineColor, state.lineAlpha)
      this.graphics.drawPolygon(state.points.map(pos =>
        new PIXI.Point(pos.x * globalData.toWorldUnits, pos.y * globalData.toWorldUnits)
      ))
      if (state.fillColor !== null) {
        this.graphics.endFill()
      }
    }
  }
}
