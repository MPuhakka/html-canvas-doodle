import Shape from './Shape'
import Mover from './Mover'
import {DrawerState} from '../Drawer'
import {Router} from 'express'

export default class Spiral extends Mover {

  x : number
  y : number
  private a : number = 50
  private b : number = 0.1
  private lineLength : number = 20
  private increment: number = 0.1
  private base: number = Math.E

  private timeSinceLastDrawn : number = -1
  private readonly DRAW_INTERVAL = 20

  private color = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();

  constructor(drawer : DrawerState) {
    super(drawer)
    const canvas = drawer.context.canvas
    this.x = canvas.width * Math.random()
    this.y = canvas.height * Math.random()

  }

  private readonly MOVE_SPEED = 10
  private angle = Math.random() * Math.PI * 2

  protected move() {
    const {width} = this.drawerState.context.canvas
    if ( this.isOnEdge() ) {
      this.angle = Math.random() * Math.PI * 2
    }
    super.move(this.MOVE_SPEED, this.angle)
  }

  draw() {

    const startX = this.x
    const startY = this.y

    const {base, lineLength, increment} = this
    

    const c = this.drawerState.context;
    c.strokeStyle = this.color
    c.moveTo(startX, startY)
    c.beginPath()
    const rotation = this.angleToMouse()
    for (let i = 0; i < lineLength; i += increment) {
      const x = this.a * Math.pow(base, this.b * i) * Math.cos(i + rotation) + startX
      const y = this.a * Math.pow(base, this.b * i * 0.7) * Math.sin(i + rotation) + startY
      c.lineTo(x, y)
      c.stroke()
      c.moveTo(x, y)
    }
    c.beginPath()
  }

  private angleToMouse() {
    const p2 = {
      x: this.drawerState.mouseX,
      y: this.drawerState.mouseY
    }
    const p1 = {
      x: this.x,
      y: this.y
    }
    var angleRadians = (Math.atan2(p2.y - p1.y, p2.x - p1.x))
    if ( angleRadians > 0 ) {
      angleRadians += ( Math.PI / 2 )
    }
    else if (angleRadians < 0 ) {
      angleRadians = Math.PI - Math.abs(angleRadians)
      angleRadians -= Math.PI / 2
      if ( angleRadians < 0 ) {
        angleRadians = Math.PI * 2 + angleRadians
      }
    }
    return angleRadians
  }

  isDrawRequired(timediff: number) {
    if (this.timeSinceLastDrawn === -1) {
      this.timeSinceLastDrawn = 0
      return true
    }
    this.timeSinceLastDrawn += timediff
    if (this.timeSinceLastDrawn > this.DRAW_INTERVAL) {
      this.timeSinceLastDrawn = 0
      this.move()
      return true
    }
    return false
  }
}