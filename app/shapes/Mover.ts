import Shape from './Shape'

function clamp(val: number, min: number, max: number) {
  return val > max ? max : val < min ? min : val;
}

export default abstract class Mover extends Shape {
  protected x: number
  protected y: number


  protected move(distance: number, angle: number) {
    const dx = Math.sin(angle) * distance
    const dy = Math.cos(angle) * distance
    // console.log("angle", (angle / Math.PI).toFixed(3), "dx", dx.toFixed(3), "dy", dy.toFixed(3))
    const newX = this.x + dx
    const newY = this.y - dy
    const {width, height} = this.drawerState.context.canvas
    this.x = clamp(newX, 0, width)
    this.y = clamp(newY, 0, height)
  }

  protected isOnEdge(): boolean {
    const {width, height} = this.drawerState.context.canvas
    const x = this.x
    const y = this.y
    if ( x === width || x === 0 ) {
      return true
    }
    if ( y === height || y === 0 ) {
      return true
    }
    return false
  }
}