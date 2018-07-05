import {DrawerState} from '../Drawer'

export default interface Drawable {
  isDrawRequired (timeDiff:number): boolean,
  draw (): void,
  drawerState: DrawerState
}