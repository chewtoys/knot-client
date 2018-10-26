<template>
  <div class="dashboard-page new-post new-photo-post h-screen">
    <navigation-bar>
      <span slot="title">New Photo</span>
      <div class="button is-primary is-inverted is-outlined is-small" slot="left-buttons" @click="goBack">Cancel</div>
    </navigation-bar>
    <div class="new-post-inner">
      <transition name="nearby-list">
        <add-location v-show="addingLocation" @locationChosen="attachLocation" @hide="addingLocation = false"></add-location>
      </transition>
      <form @submit.prevent="newPhotoPost">
        <div class="flex p-5">
          <div class="w-12 h-12 relative mr-4">
            <picture-input
              ref="pictureInput"
              :hideChangeButton="true"
              :plain="true"
              accept="image/*"
              size="10"
              width="120"
              height="120"
              class="picture-input border border-grey-light"
            ></picture-input>
          </div>
          <textarea class="flex-grow text-sm resize-none" rows="8" v-model="post.body" placeholder="Caption your photo"></textarea>
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
import objectToFormData from 'object-to-formdata'
import AddLocation from '~/components/AddLocation'
import NavigationBar from '~/components/NavigationBar'
import { mapActions } from 'vuex'
import { processImage } from '~/utils/process-image'

export default {
  name: 'NewPhotoPost',
  components: {
    AddLocation,
    NavigationBar
  },
  data() {
    return {
      posting: false,
      addingLocation: false,
      post: {
        body: '',
        image: null,
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
    ...mapActions(['addPhotoPost']),
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    attachLocation(place) {
      this.addingLocation = false
      this.post = Object.assign({}, this.post, { location: place })
    },
    newPhotoPost() {
      this.posting = true
      const { file, image } = this.$refs.pictureInput
      processImage(file, image, async blob => {
        this.post.image = blob
        const formData = objectToFormData(this.post)
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
