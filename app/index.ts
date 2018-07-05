// Load application styles
import 'styles/index.scss'

import {Drawer} from './Drawer'



const main = () => {
  const canvas:HTMLCanvasElement = document.querySelector("#canvas")
  const drawer: Drawer = new Drawer();
  drawer.startDrawing()
}

main();