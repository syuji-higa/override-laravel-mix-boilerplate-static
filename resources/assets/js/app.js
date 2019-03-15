import ClientFlagSetter from './views/client-flag-setter'
import { windowSizeObserver } from './module'
import Lazyloader from './views/lazyloader'
import HeightFitter from './views/height-fitter'

new ClientFlagSetter()

windowSizeObserver.on().resize()

new Lazyloader().create().on()
new HeightFitter().update().on()
