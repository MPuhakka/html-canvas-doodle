import Drawable from './Drawable'
import {DrawerState} from '../Drawer'

export default abstract class Shape implements Drawable {
  drawerState: DrawerState

  constructor(drawer: DrawerState ) {
    this.drawerState = drawer
  }

  abstract draw(): void

  public isDrawRequired(timediff: number) {
    return false
  }
}