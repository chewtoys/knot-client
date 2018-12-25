<template>
  <div class="overflow-y-auto scrolling-touch">
    <div class="h-32 bg-grey-light bg-cover cover-photo" />
    <div class="flex items-start p-4 -mt-16">
      <div
        v-if="parseInt($route.params.id, 10) === user.id"
        class="relative">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="doUpdateAvatar">
        <Avatar
          :user="user"
          class="rounded w-16 mr-3 shadow-md cursor-pointer"
          @click.native="$refs.fileInput.click()" />
        <div
          v-show="uploadingAvatar"
          class="flex justify-center items-center w-16 h-16 rounded bg-black-75 absolute pin-t pin-l text-white text-xs">Loading...</div>
      </div>
      <div v-else>
        <Avatar
          :user="selectedProfile.user"
          class="rounded w-16 mr-3 shadow-md" />
      </div>
      <div>
        <h3 class="text-white font-light text-shadow">{{ selectedProfile.user.first_name }}</h3>
        <h3 class="text-white font-light text-shadow">{{ selectedProfile.user.last_name }}</h3>
      </div>
    </div>
    <ActivityFeed :posts="selectedProfile.posts.data" />
    <div
      ref="scrollObserver"
      class="h-4" />
  </div>
</template>
<script>
import ActivityFeed from '~/components/ActivityFeed'
import Avatar from '~/components/Avatar'
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  components: {
    ActivityFeed,
    Avatar
  },
  data() {
    return {
      uploadingAvatar: false
    }
  },
  computed: {
    ...mapGetters(['user', 'selectedProfile'])
  },
  watch: {
    userFeed: function() {
      this.bindIntersectionObserver()
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.observer = null
      if (!this.user.id) {
        await this.fetchUser()
      }
      await this.fetchSelectedProfile({
        id: this.$route.params.id,
        page: 1
      })
    })
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchSelectedProfile', 'updateAvatar']),
    bindIntersectionObserver() {
      if (this.observer) {
        this.observer.disconnect()
      }

      this.observer = null
      this.observer = new IntersectionObserver(([entry], observer) => {
        if (entry.intersectionRatio > 0) {
          if (this.userFeed.current_page < this.userFeed.last_page) {
            this.fetchUserFeed({
              id: this.user.id,
              page: this.userFeed.current_page + 1
            })
          } else {
            observer.disconnect()
          }
        }
      })
      this.observer.observe(this.$refs.scrollObserver)
    },
    async doUpdateAvatar() {
      this.uploadingAvatar = true
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('avatar', this.$refs.fileInput.files[0])
      await this.updateAvatar(formData)
      this.uploadingAvatar = false
      window.location.reload()
    }
  }
}
</script>
<style>
.cover-photo {
  background-image: url('~assets/img/cover-photo-default.jpg');
}
</style>
