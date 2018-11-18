<template>
  <div class="dashboard-page new-post new-text-post h-screen">
    <NavigationBar>
      <span slot="title">New Text Post</span>
      <div
        slot="left-buttons"
        class="button is-primary is-inverted is-outlined is-small"
        @click="goBack">Cancel</div>
    </NavigationBar>
    <div class="new-post-inner">
      <transition name="slide-up">
        <AddLocation
          v-show="addingLocation"
          @locationChosen="attachLocation"
          @hide="addingLocation = false" />
      </transition>
      <transition name="slide-up">
        <AddAccompaniments
          v-show="addingFriends"
          :accompaniments="post.accompaniments"
          @friendsSelected="attachAccompaniments"
          @hide="addingFriends = false" />
      </transition>
      <form @submit.prevent="newTextPost">
        <div class="flex p-5">
          <textarea
            v-model="post.body"
            class="flex-grow text-sm resize-none"
            rows="8"
            placeholder="What's on your mind?" />
        </div>
        <div class="px-5">
          <button
            :disabled="posting"
            type="button"
            class="w-full bg-grey-light px-3 py-3 text-grey-darker rounded-sm mb-2"
            @click.prevent="addingFriends = true">{{ accompanimentsButtonLabel }}</button>
          <button
            :disabled="posting"
            type="button"
            class="w-full bg-grey-light px-3 py-3 text-grey-darker rounded-sm mb-2"
            @click.prevent="addingLocation = true">{{ locationButtonLabel }}</button>
          <button
            :disabled="posting"
            type="submit"
            class="w-full bg-primary px-3 py-3 text-white rounded-sm">Save Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AddLocation from '~/components/AddLocation'
import AddAccompaniments from '~/components/AddAccompaniments'
import NavigationBar from '~/components/NavigationBar'
import { mapActions } from 'vuex'

export default {
  name: 'NewTextPost',
  components: {
    AddAccompaniments,
    AddLocation,
    NavigationBar
  },
  scrollToTop: true,
  data() {
    return {
      posting: false,
      addingLocation: false,
      addingFriends: false,
      post: {
        body: '',
        location: {},
        accompaniments: []
      }
    }
  },
  computed: {
    locationButtonLabel() {
      return Object.keys(this.post.location).length
        ? this.post.location.name
        : "I'm at..."
    },
    accompanimentsButtonLabel() {
      const withCount = this.post.accompaniments.length
      if (withCount) {
        if (withCount === 1) {
          return `With ${this.post.accompaniments[0].first_name}`
        } else {
          return `With ${withCount} Friends`
        }
      } else {
        return "I'm with..."
      }
    }
  },
  methods: {
    ...mapActions(['addTextPost']),
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    attachAccompaniments(people) {
      this.addingFriends = false
      this.post.accompaniments = people
    },
    attachLocation(place) {
      this.addingLocation = false
      this.post = Object.assign({}, this.post, { location: place })
    },
    async newTextPost() {
      this.posting = true
      await this.addTextPost({
        ...this.post,
        accompaniments: this.post.accompaniments.map(friend => {
          return {
            user_id: friend.id,
            name: friend.full_name
          }
        })
      })
      this.posting = false
      this.$router.push('/')
    }
  }
}
</script>
