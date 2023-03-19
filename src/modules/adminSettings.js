import { set, cloneDeep } from 'lodash'

export const defaultState = {
  needsReboot: null,
  config: null,
  modifiedPaths: null,
  descriptions: null
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
    },
    updateAdminDescriptions (state, { descriptions }) {
      state.descriptions = descriptions
    }
  },
  actions: {
    setInstanceAdminSettings ({ state, commit, dispatch }, { backendDbConfig }) {
      const config = state.config || {}
      const modifiedPaths = state.modifiedPaths || new Set()
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
      console.log(config[':pleroma'][':welcome'])
      commit('updateAdminSettings', { config, modifiedPaths })
    },
    setInstanceAdminDescriptions ({ state, commit, dispatch }, { backendDescriptions }) {
      const convert = ({ children, description, label, key = '<ROOT>', group, suggestions }, path, acc) => {
        const newPath = group ? group + '.' + key : key
        const obj = { description, label, suggestions }
        if (Array.isArray(children)) {
          children.forEach(c => {
            convert(c, '.' + newPath, obj)
          })
        }
        set(acc, newPath, obj)
      }

      const descriptions = {}
      backendDescriptions.forEach(d => convert(d, '', descriptions))
      commit('updateAdminDescriptions', { descriptions })
    },
    pushAdminSetting ({ rootState, state, commit, dispatch }, { path, value }) {
      const [group, key, ...rest] = path.split(/\./g)
      const clone = {} // not actually cloning the entire thing to avoid excessive writes
      set(clone, rest.join('.'), value)

      // TODO cleanup paths in modifiedPaths
      const convert = (value) => {
        if (typeof value !== 'object') {
          return value
        } else if (Array.isArray(value)) {
          return value.map(convert)
        } else {
          return Object.entries(value).map(([k, v]) => ({ tuple: [k, v] }))
        }
      }

      rootState.api.backendInteractor.pushInstanceDBConfig({
        payload: {
          configs: [{
            group,
            key,
            value: convert(clone)
          }]
        }
      })
        .then(() => rootState.api.backendInteractor.fetchInstanceDBConfig())
        .then(backendDbConfig => dispatch('setInstanceAdminSettings', { backendDbConfig }))
    },
    resetAdminSetting ({ rootState, state, commit, dispatch }, { path }) {
      const [group, key, subkey] = path.split(/\./g)

      state.modifiedPaths.delete(path)

      return rootState.api.backendInteractor.pushInstanceDBConfig({
        payload: {
          configs: [{
            group,
            key,
            delete: true,
            subkeys: [subkey]
          }]
        }
      })
        .then(() => rootState.api.backendInteractor.fetchInstanceDBConfig())
        .then(backendDbConfig => dispatch('setInstanceAdminSettings', { backendDbConfig }))
    }
  }
}

export default adminSettingsStorage
