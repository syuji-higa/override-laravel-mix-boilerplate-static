import { loadImage } from '../utils/load'

class Lazyload {
  _selfClassName = ''
  _isLoadedClassName = ''
  _$$el
  _observer // IntersectionObserver
  _targets = new Set()

  /**
   * @return {Object}
   */
  static get _defOpts() {
    return {
      selfClassName: 'js-lazyload',
      isLoadedClassName: 'is-lazyloaded'
    }
  }

  /**
   * @param {Object} [opts]
   * @param {string} [opts.selfClassName]
   * @param {string} [opts.isLoadedClassName]
   */
  constructor(opts = {}) {
    const { selfClassName, isLoadedClassName } = Object.assign(
      Lazyload._defOpts,
      opts
    )

    this._selfClassName = selfClassName
    this._isLoadedClassName = isLoadedClassName
  }

  /**
   * @return {Instance}
   */
  create() {
    this._$$el = document.getElementsByClassName(this._selfClassName)
    this._observer = new IntersectionObserver(this._inviewport.bind(this), {
      rootMargin: '50% 0% 50% 0%'
    })
    return this
  }

  /**
   * @return {Instance}
   */
  destroy() {
    this._$$el = null
    this._observer = null
    this._targets.clear()
    return this
  }

  /**
   * @return {Instance}
   */
  on() {
    for (const $el of Array.from(this._$$el)) {
      if (!$el.dataset.src) {
        throw new Error('"data-src" has not been set.')
      }
      this.add($el)
    }
    return this
  }

  /**
   * @return {Instance}
   */
  off() {
    this._targets.forEach(($el) => {
      this.remove($el)
    })
    return this
  }

  /**
   * @return {Instance}
   */
  add($el) {
    this._observer.observe($el)
    this._targets.add($el)
    return this
  }

  /**
   * @return {Instance}
   */
  remove($el) {
    this._observer.unobserve($el)
    this._targets.delete($el)
    return this
  }

  /**
   * @param {Array<IntersectionObserverEntry>} entries
   * @return {Promise}
   */
  async _inviewport(entries) {
    const loadList = []

    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        this._setSrc(target)
        this.remove(target)

        loadList.push(() => {
          return (async () => {
            await loadImage(target.dataset.src)
            target.classList.add(this._isLoadedClassName)
          })()
        })
      }
    }

    await Promise.all(loadList.map((load) => load()))
  }

  /**
   * @param {Element} $el
   */
  _setSrc($el) {
    const _src = $el.dataset.src
    // img
    if ($el.src) {
      $el.src = _src
    }
    // source
    else if ($el.srcset) {
      $el.srcset = _src
    }
    // background-image
    else {
      $el.style.backgroundImage = _src
    }
  }
}

export { Lazyload as default }
