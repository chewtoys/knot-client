<template>
  <div class="dashboard-page new-post new-text-post h-screen">
    <navigation-bar>
      <span slot="title">New Text Post</span>
      <div class="button is-primary is-inverted is-outlined is-small" slot="left-buttons" @click="goBack">Cancel</div>
    </navigation-bar>
    <div class="new-post-inner">
      <transition name="nearby-list">
        <add-location v-show="addingLocation" @locationChosen="attachLocation" @hide="addingLocation = false"></add-location>
      </transition>
      <form @submit.prevent="newTextPost">
        <div class="flex p-5">
          <textarea class="flex-grow text-sm resize-none" rows="8" v-model="post.body" placeholder="What's on your mind?"></textarea>
        </div>
        <div class="px-5">
          <button type="button" class="w-full bg-grey-light px-3 py-3 text-grey-darker rounded-sm mb-2" @click.prevent="addingLocation = true">{{ locationButtonLabel }}</button>
          <button class="w-full bg-primary px-3 py-3 text-white rounded-sm" :disabled="posting" type="submit">Save Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AddLocation from '~/components/AddLocation'
import NavigationBar from '~/components/NavigationBar'
import { mapActions } from 'vuex'

export default {
  name: 'NewTextPost',
  components: {
    AddLocation,
    NavigationBar
  },
  scrollToTop: true,
  data() {
    return {
      posting: false,
      addingLocation: false,
      post: {
        body: '',
        location: {}
      }
    }
  },
  computed: {
    locationButtonLabel() {
      return Object.keys(this.post.location).length
        ? this.post.location.name
        : "I'm at..."
    }
  },
  methods: {
    ...mapActions(['addTextPost']),
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    attachLocation(place) {
      this.addingLocation = false
      this.post = Object.assign({}, this.post, { location: place })
    },
    async newTextPost() {
      this.posting = true
      await this.addTextPost(this.post)
      this.posting = false
      this.$router.push('/')
    }
  }
}
</script>
