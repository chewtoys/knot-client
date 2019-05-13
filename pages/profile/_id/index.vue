<template>
  <div class="overflow-y-auto scrolling-touch">
    <div class="h-32 bg-grey-light bg-cover cover-photo" />
    <div class="flex items-start p-4 -mt-16">
      <div
        v-if="parseInt($route.params.id, 10) === $auth.user.id"
        class="relative">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="doUpdateAvatar">
        <Avatar
          :user="$auth.user"
          :size="64"
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
    <ActivityFeed
      :posts="selectedProfile.posts.data"
      @loadNextPage="loadNextPage" />
  </div>
</template>
<script>
import ActivityFeed from '~/components/ActivityFeed'
import Avatar from '~/components/Avatar'
import { mapActions, mapGetters } from 'vuex'
import loadImage from 'blueimp-load-image'
export default {
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
    ...mapGetters(['selectedProfile'])
  },
  mounted() {
    this.$nextTick(async () => {
      if (!this.$auth.user.id) {
        await this.$auth.fetchUser()
      }
      await this.fetchSelectedProfile({
        id: this.$route.params.id,
        page: 1
      })
    })
  },
  methods: {
    ...mapActions(['fetchSelectedProfile', 'updateAvatar']),
    async loadNextPage() {
      if (
        this.selectedProfile.posts.current_page <
        this.selectedProfile.posts.last_page
      ) {
        await this.fetchSelectedProfile({
          id: this.$auth.user.id,
          page: this.selectedProfile.posts.current_page + 1
        })
      }
    },
    async doUpdateAvatar() {
      this.uploadingAvatar = true
      loadImage(
        this.$refs.fileInput.files[0],
        canvas => {
          canvas.toBlob(async blob => {
            const formData = new FormData()
            formData.append('_method', 'PUT')
            formData.append('avatar', blob)
            await this.updateAvatar(formData)
            this.uploadingAvatar = false
            window.location.reload()
          })
        },
        {
          canvas: true,
          crop: true,
          maxWidth: 600,
          maxHeight: 600,
          orientation: true
        }
      )
    }
  }
}
</script>
<style>
.cover-photo {
  background-image: url('~assets/img/cover-photo-default.jpg');
}
</style>
