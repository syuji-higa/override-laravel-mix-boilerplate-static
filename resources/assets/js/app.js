import { windowSizeObserver } from './module'
import Lazyload from './views/lazyload'

windowSizeObserver.on().resize()

new Lazyload().create().on()