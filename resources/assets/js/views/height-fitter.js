import { store } from '../store'

class HeightFitter {
  _$$el

  /**
   * @return {Object}
   */
  static get _defOpts() {
    return {
      selfClassName: 'js-height-fitter'
    }
  }

  /**
   * @param {Object} [opts]
   * @param {string} [opts.selfClassName]
   */
  constructor(opts = {}) {
    const { selfClassName } = Object.assign(HeightFitter._defOpts, opts)

    this._$$el = document.getElementsByClassName(selfClassName)

    this._platformType = store.state.platform.type

    this._storeStateObject = {
      windowWidthLastChangedHeight: () => {
        this.update()
      }
    }
  }

  /**
   * @return {Instance}
   */
  on() {
    store.observe(this._storeStateObject)
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    store.unobserve(this._storeStateObject)
    return this
  }

  /**
   * @return {Instance}
   */
  update() {
    const _height = store.state.windowWidthLastChangedHeight

    Array.from(this._$$el, ($el) => {
      if (this._platformType === $el.dataset.heightFitterIgnore) return
      $el.style.height = `${_height}px`
    })

    return this
  }
}

export { HeightFitter as default }
