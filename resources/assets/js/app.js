import { windowSizeObserver } from './module'
import Lazyloader from './views/lazyloader'
import HeightFitter from './views/height-fitter'

windowSizeObserver.on().resize()

new Lazyloader().create().on()
new HeightFitter().update().on()
