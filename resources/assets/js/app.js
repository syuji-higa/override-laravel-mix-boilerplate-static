import '@babel/polyfill'
import 'intersection-observer'
import ClientFlagSetter from './views/client-flag-setter'
import objectFitImages from 'object-fit-images'
import { windowSizeObserver, scrollObserver } from './module'
import PageLoader from './views/page-loader'
import Lazyloader from './views/lazyloader'
import HeightFitter from './views/height-fitter'
import Inviewporter from './views/inviewporter'

new PageLoader().start()

new ClientFlagSetter()
objectFitImages()

windowSizeObserver.on().update()
scrollObserver.on().update()

new Lazyloader().create().on()
new HeightFitter().update().on()
new Inviewporter().create().on()
