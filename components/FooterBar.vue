<template>
  <div class="footer-bar bg-grey-lighter border-t border-grey-light flex justify-between items-center px-2">
    <nuxt-link
      to="/"
      class="flex text-xxs no-underline text-grey-darkest justify-center w-12">
      <img
        src="~/assets/img/icons/timeline.svg"
        class="h-5 mb-1">
    </nuxt-link>
    <nuxt-link
      to="/notifications"
      class="flex text-xxs no-underline text-grey-darkest justify-center w-12">
      <img
        src="~/assets/img/icons/notifications.svg"
        class="h-5 mb-1">
    </nuxt-link>
    <button
      :class="{'menu-open': menuOpen}"
      class="toggle-menu rounded-full bg-red w-8 h-8 text-white block no-underline text-xl text-center flex justify-center items-center leading-none cursor-pointer"
      @click="$emit('addNewPost')"><img
        src="~/assets/img/icons/add.svg"></button>
    <nuxt-link
      :to="`/profile/${user.id}`"
      class="flex text-xxs no-underline text-grey-darkest justify-center w-12">
      <img
        src="~/assets/img/icons/profile.svg"
        class="h-5 mb-1">
    </nuxt-link>
    <nuxt-link
      to="/friends"
      class="flex text-xxs no-underline text-grey-darkest justify-center w-12">
      <img
        src="~/assets/img/icons/friends.svg"
        class="h-5 mb-1">
    </nuxt-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    menuOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: mapGetters(['user'])
}
</script>
<style lang="scss" scoped>
.footer-bar {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.toggle-menu {
  -webkit-tap-highlight-color: rgba(#000, 0);
  transition: transform 450ms ease;
  outline: none;

  img {
    height: 24px;
  }

  &.menu-open {
    transform: rotate(315deg);
  }
}
</style>
