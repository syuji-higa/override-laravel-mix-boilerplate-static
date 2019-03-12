import Vanix from 'vanix'
import Bowser from 'bowser'

// bowser
const bowser = Bowser.getParser(window.navigator.userAgent)
const { browser, engin, os, platform } = bowser.parsedResult

const state = {
  browser,
  engin,
  os,
  platform,
  breakPoint: [768, 1024],
  windowWidth: 0,
  windowHeight: 0,
  windowSizeType: ''
}

const mutations = {
  setWindowWidth(state, data) {
    state.windowWidth = data
  },
  setWindowHeight(state, data) {
    state.windowHeight = data
  },
  setWindowSizeType(state, data) {
    state.windowSizeType = data
  }
}

const actions = {
  async setWindowWidth(context, data) {
    await new Promise((resolve) => {
      setTimeout(() => {
        context.commit('setWindowWidth', data)
        resolve()
      }, 1000)
    })
  }
}

const vanix = new Vanix({ state, mutations, actions })

export const store = vanix.create()
