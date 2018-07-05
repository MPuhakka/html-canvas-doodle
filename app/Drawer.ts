
import Drawable from './shapes/Drawable'
import Colors from './colors'
import Spiral from './shapes/Spiral';

export interface DrawerState {
  context: CanvasRenderingContext2D
  mouseX?: number
  mouseY?: number
}

export class Drawer implements DrawerState {

  context: CanvasRenderingContext2D
  private drawing: boolean
  private startTime: number
  private currentTime: number
  private ticks: number
  private drawables: Drawable[]
  private canvas: HTMLCanvasElement  
  mouseX?: number
  mouseY?: number
  handle?: any

  private resizeCanvas = () => {
    const canvas = this.canvas
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    
    if (canvas.height !== height || canvas.width !== width) {
      canvas.width = width
      canvas.height = height
    }
  }

  constructor() {
    this.init();

    window.addEventListener("resize", (event) => {
      this.stopDrawing()
      if ( this.handle !== null ) {
        clearTimeout(this.handle)
      }
      this.handle = setTimeout(()=>{
        this.reset()
      }, 400)
    })
  }
  private reset() {
    //FIXME: this is working poorly
    this.init()
    this.startDrawing()
  }

  


  init() {
    this.canvas = document.querySelector("#canvas")
    
    this.context = this.canvas.getContext("2d")
    this.startDrawing = this.startDrawing.bind(this)
    this.stopDrawing = this.stopDrawing.bind(this)
    this.loop = this.loop.bind(this)
    this.handleSingleLoop = this.handleSingleLoop.bind(this)
    this.drawables = []

    this.resizeCanvas()

    const {width, height} = this.canvas
    const frame = {
      width,
      height
    }
    this.canvas.addEventListener("mousemove", (event) => {
      const x = event.x - this.canvas.offsetLeft
      const y = event.y - this.canvas.offsetTop
      this.mouseX = x
      this.mouseY = y
      document.querySelector("#mouse").innerHTML = `x: ${x} y: ${y}`
    })
    setTimeout(()=>{
      for ( var i = 0; i < 3; ++i  ) {
        this.drawables.push(new Spiral(this))
      }
    }, 100)
  }

  /**
   * Start drawer loop
   */
  public startDrawing() {
    this.resizeCanvas()      
    this.drawing = true 
    this.startTime = Date.now();
    this.currentTime = this.startTime
    this.ticks = 0
    this.loop()
  }

  /**
   * Stop drawer loop
   */
  public stopDrawing() {
    this.drawing = false
  }

  private loop() {
    if (this.drawing) {
      requestAnimationFrame(this.loop)
      this.handleSingleLoop()
    }
  }

  private handleSingleLoop() {
    this.resizeCanvas()
    this.ticks ++
    let time = Date.now()
    let timeDiff = time - this.currentTime
    this.currentTime = time
    let redraw = false
    for ( let item of this.drawables ) {
      if ( item.isDrawRequired(timeDiff) ) {
        redraw = true
      }
    }
    if ( redraw ) {
      const context = this.context
      const canvas = context.canvas
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.beginPath()
      this.drawables.forEach( item => {
        item.draw()
      });
    }
  }

}