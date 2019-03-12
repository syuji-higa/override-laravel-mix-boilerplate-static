import { store } from '../store'
import { eventer } from '../module'
import { debounce } from '../utils/debounce'

class WindowSizeObserver {
  _isMobile = false
  _resizeDebounce // {function}
  _resizeEvent = {}

  constructor() {
    this._isMobile = !!store.state.platform.type.match(/^mobile$/)

    this._resizeDebounce = debounce(200)
    this._resizeEvent = eventer.create(
      window,
      'resize',
      this._onResize.bind(this)
    )
  }

  /**
   * @return {Instance}
   */
  add() {
    this._resizeEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  remove() {
    this._resizeEvent.remove()
    return this
  }

  /**
   * @return {Instance}
   */
  resize() {
    store.commit('setWindowWidth', window.innerWidth)
    store.commit('setWindowHeight', window.innerHeight)

    if (store.state.breakPoint[0] > store.state.windowWidth) {
      if (store.state.windowSizeType !== 'mobile') {
        store.commit('setWindowSizeType', 'mobile')
      }
    } else if (store.state.breakPoint[1] > store.state.windowWidth) {
      if (store.state.windowSizeType !== 'tablet') {
        store.commit('setWindowSizeType', 'tablet')
      }
    } else {
      if (store.state.windowSizeType !== 'desktop') {
        store.commit('setWindowSizeType', 'desktop')
      }
    }

    document.dispatchEvent(
      new CustomEvent('resize', {
        detail: {
          size: {
            width: store.state.windowWidth,
            height: store.state.windowHeight
          },
          type: store.state.windowSizeType
        }
      })
    )

    return this
  }

  _onResize() {
    if (!this._isMobile || store.state.windowWidth !== window.innerWidth) {
      this._resizeDebounce(this.resize.bind(this))
    }
  }
}

export { WindowSizeObserver as default }
