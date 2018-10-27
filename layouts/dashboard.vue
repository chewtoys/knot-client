<template>
  <div class="dashboard h-screen bg-grey-lighter relative">
    <navigation-bar>
      <img src="~assets/img/knot.svg" slot="title" class="h-6 cursor-pointer" @click="reload" />
    </navigation-bar>
    <nuxt/>
    <transition name="fade">
      <div class="new-post-menu absolute flex flex-col items-center" v-show="newPostMenuShowing">
        <div class="mt-auto p-4 flex flex-col items-center w-full text-center">
          <nuxt-link to="/posts/photo" class="bg-white w-1/2 rounded-full px-4 py-3 text-primary my-3 no-underline block">Photo Post</nuxt-link>
          <nuxt-link to="/posts/text" class="bg-white w-1/2 rounded-full px-4 py-3 text-primary my-3 no-underline block">Text Post</nuxt-link>
        </div>
      </div>
    </transition>
    <footer-bar @addNewPost="showNewPostMenu" :menu-open="newPostMenuShowing" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NavigationBar from '~/components/NavigationBar'
import FooterBar from '~/components/FooterBar'
export default {
  middleware: 'auth',
  components: {
    FooterBar,
    NavigationBar
  },
  data() {
    return {
      newPostMenuShowing: false
    }
  },
  async mounted() {
    await this.fetchUser()
    await this.fetchFriendships()

    navigator.geolocation.getCurrentPosition(position => {
      this.fetchCurrentLocation(position.coords)
    })
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchFriendships', 'fetchCurrentLocation']),
    showNewPostMenu() {
      this.newPostMenuShowing = !this.newPostMenuShowing
    },
    reload() {
      window.location.reload(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 44px 1fr 48px;
  grid-template-rows: calc(44px + constant(safe-area-inset-top)) 1fr calc(48px + constant(safe-area-inset-bottom));
  grid-template-rows: calc(44px + env(safe-area-inset-top)) 1fr calc(48px + env(safe-area-inset-bottom));
}

.new-post-menu {
  top: 44px;
  top: calc(44px + constant(safe-area-inset-top));
  top: calc(44px + env(safe-area-inset-top));
  right: 0;
  bottom: 48px;
  bottom: calc(48px + constant(safe-area-inset-bottom));
  bottom: calc(48px + env(safe-area-inset-bottom));
  left: 0;
  background: rgba(#000, 0.75);
  z-index: 99;
}
</style>
