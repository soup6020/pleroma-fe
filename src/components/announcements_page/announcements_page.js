import Announcement from '../announcement/announcement.vue'

const AnnouncementsPage = {
  components: {
    Announcement
  },
  computed: {
    announcements () {
      return [{
        "id": "8",
        "content": "<p>Looks like there was an issue processing audio attachments without embedded art since yesterday due to an experimental new feature. That issue has now been fixed, so you may see older posts with audio from other servers pop up in your feeds now as they are being finally properly processed. Sorry!</p>",
        "starts_at": null,
        "ends_at": null,
        "all_day": false,
        "published_at": "2020-07-03T01:27:38.726Z",
        "updated_at": "2020-07-03T01:27:38.752Z",
        "read": true,
        "mentions": [],
        "statuses": [],
        "tags": [],
        "emojis": [],
        "reactions": []
      }, {
        "id": "8",
        "content": "<p>Looks like there was an issue processing audio attachments without embedded art since yesterday due to an experimental new feature. That issue has now been fixed, so you may see older posts with audio from other servers pop up in your feeds now as they are being finally properly processed. Sorry!</p>",
        "starts_at": null,
        "ends_at": null,
        "all_day": false,
        "published_at": "2020-07-03T01:27:38.726Z",
        "updated_at": "2020-07-03T01:27:38.752Z",
        "read": true,
        "mentions": [],
        "statuses": [],
        "tags": [],
        "emojis": [],
        "reactions": []
      }]
    }
  }
}

export default AnnouncementsPage
