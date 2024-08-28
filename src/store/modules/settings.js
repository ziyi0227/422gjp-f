import defaultSettings from '@/settings'

import variables from '@/styles/element-variables.module.scss'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  theme: variables.theme
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    localStorage.setItem('theme', value) // 缓存起来，刷新的时候重新取用
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

