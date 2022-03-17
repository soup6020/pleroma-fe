import { set } from 'vue'

const FETCH_ANNOUNCEMENT_INTERVAL_MS = 1000 * 60 * 5

export const defaultState = {
  announcements: [],
  fetchAnnouncementsTimer: undefined
}

export const mutations = {
  setAnnouncements (state, announcements) {
    set(state, 'announcements', announcements)
  },
  setAnnouncementRead (state, { id, read }) {
    if (!state.announcements[id]) {
      return
    }

    set(state.announcements[id], 'read', read)
  },
  setFetchAnnouncementsTimer (state, timer) {
    set(state, 'fetchAnnouncementsTimer', announcements)
  }
}

const announcements = {
  state: defaultState,
  mutations,
  actions: {
    fetchAnnouncements (store) {
      return store.rootState.api.backendInteractor.fetchAnnouncements()
        .then(announcements => {
          store.commit('setAnnouncements', announcements)
        })
    },
    markAnnouncementAsRead (store, id) {
      return store.rootState.api.backendInteractor.dismissAnnouncement({ id })
        .then(() => {
          store.commit('setAnnouncementRead', { id, read: true })
        })
    },
    startFetchingAnnouncements (store) {
      if (store.state.fetchAnnouncementsTimer) {
        return
      }

      const interval = setInterval(() => store.dispatch('fetchAnnouncements'), FETCH_ANNOUNCEMENT_INTERVAL_MS)
      store.commit('setFetchAnnouncementsTimer', interval)

      return store.dispatch('fetchAnnouncements')
    },
    stopFetchingAnnouncements (store) {
      const interval = store.state.fetchAnnouncementsTimer
      store.commit('setFetchAnnouncementsTimer', undefined)
      clearInterval(interval)
    },
    postAnnouncement (store, { content, startsAt, endsAt, allDay }) {
      return store.rootState.api.backendInteractor.postAnnouncement({ content, startsAt, endsAt, allDay })
        .then(() => {
          return store.dispatch('fetchAnnouncements')
        })
    },
    deleteAnnouncement (store, id) {
      return store.rootState.api.backendInteractor.deleteAnnouncement({ id })
        .then(() => {
          return store.dispatch('fetchAnnouncements')
        })
    }
  }
}

export default announcements
