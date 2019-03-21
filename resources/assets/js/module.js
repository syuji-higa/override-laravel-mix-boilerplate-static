import Eventer from './modules/eventer'
import WindowSizeObserver from './modules/window-size-observer'
import ScrollObserver from './modules/scroll-observer'
import ImagePreloader from './modules/image-preloader'

// Eventer
export const eventer /* :Instance */ = new Eventer()

// WindowSizeObserver
export const windowSizeObserver /* :Instance */ = new WindowSizeObserver()

// WindowSizeObserver
export const scrollObserver /* :Instance */ = new ScrollObserver()

// ImagePreloader
export const imagePreloader /* :Instance */ = new ImagePreloader()
