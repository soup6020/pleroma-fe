import { set, cloneDeep } from 'lodash'

export const defaultState = {
  needsReboot: null,
  config: null,
  modifiedPaths: null
}

export const newUserFlags = {
  ...defaultState.flagStorage
}

const adminSettingsStorage = {
  state: {
    ...cloneDeep(defaultState)
  },
  mutations: {
    updateAdminSettings (state, { config, modifiedPaths }) {
      state.config = config
      state.modifiedPaths = modifiedPaths
    }
  },
  actions: {
    setInstanceAdminSettings ({ state, commit, dispatch }, { backendDbConfig }) {
      const config = {}
      const modifiedPaths = new Set()
      backendDbConfig.configs.forEach(c => {
        const path = c.group + '.' + c.key
        if (c.db) {
          c.db.forEach(x => modifiedPaths.add(path + '.' + x))
        }
        const convert = (value) => {
          if (Array.isArray(value) && value.length > 0 && value[0].tuple) {
            return value.reduce((acc, c) => {
              return { ...acc, [c.tuple[0]]: convert(c.tuple[1]) }
            }, {})
          } else {
            return value
          }
        }
        set(config, path, convert(c.value))
      })
      console.log(config)
      commit('updateAdminSettings', { config, modifiedPaths })
    }
  }
}

export default adminSettingsStorage
