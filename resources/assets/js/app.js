import '@babel/polyfill'
import 'intersection-observer'
import ClientFlagSetter from './views/client-flag-setter'
import objectFitImages from 'object-fit-images'
import {
  windowSizeObserver,
  // scrollObserver,
  inviewportObserver,
  inviewportScrollObserver
} from './modules'
import PageLoader from './views/page-loader'
import Lazyloader from './views/lazyloader'
import HeightFitter from './views/height-fitter'
import Inviewporter from './views/inviewporter'
import Ignitioner from './views/ignitioner'

new PageLoader().start()

new ClientFlagSetter()
objectFitImages()

windowSizeObserver.on().update()
// scrollObserver.add(window) // always scroll observe
inviewportObserver.create()
inviewportScrollObserver.on()

new HeightFitter().update().on()

document.addEventListener(
  'pageLoaded',
  () => {
    new Inviewporter().create().on()
    new Lazyloader().create().on()
    new Ignitioner().create().on()
  },
  { once: true }
)
