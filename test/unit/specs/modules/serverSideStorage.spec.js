import { cloneDeep } from 'lodash'

import {
  VERSION,
  COMMAND_TRIM_FLAGS,
  COMMAND_TRIM_FLAGS_AND_RESET,
  _getRecentData,
  _getAllFlags,
  _mergeFlags,
  _resetFlags,
  mutations,
  defaultState,
  newUserFlags
} from 'src/modules/serverSideStorage.js'

describe('The serverSideStorage module', () => {
  describe('mutations', () => {
    describe('setServerSideStorage', () => {
      const { setServerSideStorage } = mutations
      const user = {
        created_at: new Date('1999-02-09'),
        storage: {}
      }

      it('should initialize storage if none present', () => {
        const state = cloneDeep(defaultState)
        setServerSideStorage(state, user)
        expect(state.cache._version).to.eql(VERSION)
        expect(state.cache._timestamp).to.be.a('number')
        expect(state.cache.flagStorage).to.eql(defaultState.flagStorage)
      })

      it('should initialize storage with proper flags for new users if none present', () => {
        const state = cloneDeep(defaultState)
        setServerSideStorage(state, { ...user, created_at: new Date() })
        expect(state.cache._version).to.eql(VERSION)
        expect(state.cache._timestamp).to.be.a('number')
        expect(state.cache.flagStorage).to.eql(newUserFlags)
      })

      it('should merge flags even if remote timestamp is older', () => {
        const state = {
          ...cloneDeep(defaultState),
          cache: {
            _timestamp: Date.now(),
            _version: VERSION,
            ...cloneDeep(defaultState)
          }
        }
        setServerSideStorage(
          state,
          {
            ...user,
            storage: {
              _timestamp: 123,
              _version: VERSION,
              flagStorage: {
                ...defaultState.flagStorage,
                updateCounter: 1
              }
            }
          }
        )
        expect(state.cache.flagStorage).to.eql({
          ...defaultState.flagStorage,
          updateCounter: 1
        })
      })

      it('should reset local timestamp to remote if contents are the same', () => {
        const state = {
          ...cloneDeep(defaultState),
          cache: null
        }
        setServerSideStorage(
          state,
          {
            ...user,
            storage: {
              _timestamp: 123,
              _version: VERSION,
              flagStorage: {
                ...defaultState.flagStorage,
                updateCounter: 999
              }
            }
          }
        )
        expect(state.cache._timestamp).to.eql(123)
        expect(state.flagStorage.updateCounter).to.eql(999)
        expect(state.cache.flagStorage.updateCounter).to.eql(999)
      })

      it('should remote version if local missing', () => {
        const state = cloneDeep(defaultState)
        setServerSideStorage(state, user)
        expect(state.cache._version).to.eql(VERSION)
        expect(state.cache._timestamp).to.be.a('number')
        expect(state.cache.flagStorage).to.eql(defaultState.flagStorage)
      })
    })
  })

  describe('helper functions', () => {
    describe('_getRecentData', () => {
      it('should handle nulls correctly', () => {
        expect(_getRecentData(null, null)).to.eql({ recent: null, stale: null, needUpload: true })
      })

      it('doesn\'t choke on invalid data', () => {
        expect(_getRecentData({ a: 1 }, { b: 2 })).to.eql({ recent: null, stale: null, needUpload: true })
      })

      it('should prefer the valid non-null correctly, needUpload works properly', () => {
        const nonNull = { _version: VERSION, _timestamp: 1 }
        expect(_getRecentData(nonNull, null)).to.eql({ recent: nonNull, stale: null, needUpload: true })
        expect(_getRecentData(null, nonNull)).to.eql({ recent: nonNull, stale: null, needUpload: false })
      })

      it('should prefer the one with higher timestamp', () => {
        const a = { _version: VERSION, _timestamp: 1 }
        const b = { _version: VERSION, _timestamp: 2 }

        expect(_getRecentData(a, b)).to.eql({ recent: b, stale: a, needUpload: false })
        expect(_getRecentData(b, a)).to.eql({ recent: b, stale: a, needUpload: false })
      })

      it('case where both are same', () => {
        const a = { _version: VERSION, _timestamp: 3 }
        const b = { _version: VERSION, _timestamp: 3 }

        expect(_getRecentData(a, b)).to.eql({ recent: b, stale: a, needUpload: false })
        expect(_getRecentData(b, a)).to.eql({ recent: b, stale: a, needUpload: false })
      })
    })

    describe('_getAllFlags', () => {
      it('should handle nulls properly', () => {
        expect(_getAllFlags(null, null)).to.eql([])
      })
      it('should output list of keys if passed single object', () => {
        expect(_getAllFlags({ flagStorage: { a: 1, b: 1, c: 1 } }, null)).to.eql(['a', 'b', 'c'])
      })
      it('should union keys of both objects', () => {
        expect(_getAllFlags({ flagStorage: { a: 1, b: 1, c: 1 } }, { flagStorage: { c: 1, d: 1 } })).to.eql(['a', 'b', 'c', 'd'])
      })
    })

    describe('_mergeFlags', () => {
      it('should handle merge two flag sets correctly picking higher numbers', () => {
        expect(
          _mergeFlags(
            { flagStorage: { a: 0, b: 3 } },
            { flagStorage: { b: 1, c: 4, d: 9 } },
            ['a', 'b', 'c', 'd'])
        ).to.eql({ a: 0, b: 3, c: 4, d: 9 })
      })
    })

    describe('_resetFlags', () => {
      it('should reset all known flags to 0 when reset flag is set to > 0 and < 9000', () => {
        const totalFlags = { a: 0, b: 3, reset: 1 }

        expect(_resetFlags(totalFlags)).to.eql({ a: 0, b: 0, reset: 0 })
      })
      it('should trim all flags to known when reset is set to 1000', () => {
        const totalFlags = { a: 0, b: 3, c: 33, reset: COMMAND_TRIM_FLAGS }

        expect(_resetFlags(totalFlags, { a: 0, b: 0, reset: 0 })).to.eql({ a: 0, b: 3, reset: 0 })
      })
      it('should trim all flags to known and reset when reset is set to 1001', () => {
        const totalFlags = { a: 0, b: 3, c: 33, reset: COMMAND_TRIM_FLAGS_AND_RESET }

        expect(_resetFlags(totalFlags, { a: 0, b: 0, reset: 0 })).to.eql({ a: 0, b: 0, reset: 0 })
      })
    })
  })
})
