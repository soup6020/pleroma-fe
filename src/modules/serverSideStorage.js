import { toRaw } from 'vue'

const VERSION = 1
const NEW_USER_DATE = new Date('04-08-2022') // date of writing this, basically

const COMMAND_TRIM_FLAGS = 1000
const COMMAND_TRIM_FLAGS_AND_RESET = 1001

const defaultState = {
  // last timestamp
  timestamp: 0,
  // need to update server
  dirty: false,
  // storage of flags - stuff that can only be set and incremented
  flagStorage: {
    updateCounter: 0, // Counter for most recent update notification seen
    // TODO move to prefsStorage when that becomes a thing since only way
    // this can be reset is by complete reset of all flags
    dontShowUpdateNotifs: 0, // if user chose to not show update notifications ever again
    reset: 0 // special flag that can be used to force-reset all flags, debug purposes only
    // special reset codes:
    // 1000: trim keys to those known by currently running FE
    // 1001: same as above + reset everything to 0
  },
  // raw data
  raw: null,
  // local cache
  cache: null
}

const newUserFlags = {
  ...defaultState.flagStorage,
  updateCounter: 1 // new users don't need to see update notification
}

const serverSideStorage = {
  state: {
    ...defaultState
  },
  mutations: {
    setServerSideStorage (state, userData) {
      const live = userData.storage
      const userNew = userData.created_at > NEW_USER_DATE
      const flagsTemplate = userNew ? newUserFlags : defaultState.defaultState
      state.raw = live
      console.log(1111, live._timestamp)
      let recent = null
      const cache = state.cache || {}
      const cacheValid = cache._timestamp > 0 && cache._version > 0
      const liveValid = live._timestamp > 0 && live._version > 0
      if (!liveValid) {
        state.dirty = true
        console.debug('Nothing valid stored on server, assuming cache to be source of truth')
        if (cacheValid) {
          recent = cache
        } else {
          console.debug(`Local cache is empty, initializing for ${userNew ? 'new' : 'existing'} user`)

          recent = {
            _timestamp: Date.now(),
            _version: VERSION,
            flagStorage: { ...flagsTemplate }
          }
        }
      } else if (!cacheValid) {
        console.debug('Valid storage on server found, no local cache found, using live as source of truth')
        recent = live
      } else {
        console.debug('Both sources have valid data, figuring things out...')
        console.log(live._timestamp, cache._timestamp)
        if (live._timestamp === cache._timestamp && live._version === cache._version) {
          console.debug('Same version/timestamp on both source, source of truth irrelevant')
          recent = cache
        } else {
          state.dirty = true
          console.debug('Different timestamp, figuring out which one is more recent')
          let stale
          if (live._timestamp < cache._timestamp) {
            recent = cache
            stale = live
          } else {
            recent = live
            stale = cache
          }

          // Merge the flags
          console.debug('Merging the flags...')
          recent.flagStorage = recent.flagStorage || { ...flagsTemplate }
          stale.flagStorage = stale.flagStorage || { ...flagsTemplate }
          const allFlags = Array.from(new Set([
            ...Object.keys(toRaw(recent.flagStorage)),
            ...Object.keys(toRaw(stale.flagStorage))
          ]))

          const totalFlags = Object.fromEntries(allFlags.map(flag => {
            const recentFlag = recent.flagStorage[flag]
            const staleFlag = stale.flagStorage[flag]
            // use flag that is of higher value
            return [flag, recentFlag > staleFlag ? recentFlag : staleFlag]
          }))

          console.debug('AAA', totalFlags)
          // flag reset functionality
          if (totalFlags.reset >= COMMAND_TRIM_FLAGS && totalFlags.reset <= COMMAND_TRIM_FLAGS_AND_RESET) {
            console.debug('Received command to trim the flags')
            const knownKeys = new Set(Object.keys(defaultState.flagStorage))
            allFlags.forEach(flag => {
              if (!knownKeys.has(flag)) {
                delete totalFlags[flag]
              }
            })
            if (totalFlags.reset === COMMAND_TRIM_FLAGS_AND_RESET) {
              // 1001 - and reset everything to 0
              console.debug('Received command to reset the flags')
              allFlags.forEach(flag => { totalFlags[flag] = 0 })
            } else {
              // reset the reset 0
              totalFlags.reset = 0
            }
          } else if (totalFlags.reset > 0 && totalFlags.reset < 9000) {
            console.debug('Received command to reset the flags')
            allFlags.forEach(flag => { totalFlags[flag] = 0 })
            // for good luck
            totalFlags.reset = 0
          }
          console.log('AAAA', totalFlags)
          state.cache.flagStorage = totalFlags
        }
      }
      state.cache = recent
      state.flagStorage = state.cache.flagStorage
    },
    setFlag (state, { flag, value }) {
      state.flagStorage[flag] = value
      state.dirty = true
    }
  },
  actions: {
    pushServerSideStorage ({ state, rootState, commit }, { force = false } = {}) {
      console.log('PUSH')
      const needPush = state.dirty || force
      if (!needPush) return
      state.cache = {
        _timestamp: Date.now(),
        _version: VERSION,
        flagStorage: toRaw(state.flagStorage)
      }
      console.log('YES')
      const params = { pleroma_settings_store: { 'pleroma-fe': state.cache } }
      rootState.api.backendInteractor
        .updateProfile({ params })
        .then((user) => commit('setServerSideStorage', user))
      state.dirty = false
    }
  }
}

export default serverSideStorage
