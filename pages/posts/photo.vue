<template>
  <div class="dashboard-page new-post new-photo-post h-screen">
    <navigation-bar>
      <span slot="title">New Photo</span>
      <div
        slot="left-buttons"
        class="button is-primary is-inverted is-outlined is-small"
        @click="goBack">Cancel</div>
    </navigation-bar>
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
      <form @submit.prevent="newPhotoPost">
        <div class="flex p-5">
          <div class="w-12 h-12 relative mr-4">
            <PictureInput
              ref="pictureInput"
              :hide-change-button="true"
              :plain="true"
              accept="image/*"
              size="20"
              width="120"
              height="120"
              class="picture-input border border-grey-light" />
          </div>
          <textarea
            v-model="post.body"
            class="flex-grow text-sm resize-none"
            rows="8"
            placeholder="Caption your photo" />
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
import objectToFormData from 'object-to-formdata'
import AddLocation from '~/components/AddLocation'
import AddAccompaniments from '~/components/AddAccompaniments'
import NavigationBar from '~/components/NavigationBar'
import { mapActions } from 'vuex'
import { processImage } from '~/utils/process-image'

export default {
  name: 'NewPhotoPost',
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
        image: null,
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
    },
    accompanimentsPostData() {
      const a = this.post.accompaniments.map(friend => {
        return {
          user_id: friend.id,
          name: friend.full_name
        }
      })

      return a.length ? a : null
    },
    locationPostData() {
      return Object.keys(this.post.location).length ? this.post.location : null
    }
  },
  methods: {
    ...mapActions(['addPhotoPost']),
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    attachAccompaniments(people) {
      this.addingFriends = false
      this.post.accompaniments = people
    },
    attachLocation(place) {
      this.addingLocation = false
      this.post.location = place
    },
    newPhotoPost() {
      this.posting = true
      const { file, image } = this.$refs.pictureInput
      processImage(file, image, async blob => {
        this.post.image = blob

        const postData = {
          ...this.post,
          accompaniments: this.accompanimentsPostData,
          location: this.locationPostData
        }
        const formData = objectToFormData(postData, { indices: true })

        await this.addPhotoPost(formData)

        this.posting = false
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.picture-input {
  background-image: url('~assets/img/icons/camera.svg');
  background-position: center;
  background-size: 32px auto;
  background-repeat: no-repeat;
}
</style>
