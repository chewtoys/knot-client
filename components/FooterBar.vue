<template>
  <div class="footer-bar bg-grey-lighter border-t border-grey-light flex justify-center items-center">
      <nuxt-link to="/" class="flex flex-col text-xxs no-underline text-grey-darkest mx-6">
        <img src="~/assets/img/icons/timeline.svg" class="h-5 mb-1" />
        <span>Timeline</span>
      </nuxt-link>
      <button class="toggle-menu rounded-full bg-red w-8 h-8 text-white block no-underline text-xl text-center flex justify-center items-center leading-none cursor-pointer mx-6" :class="{'menu-open': menuOpen}" @click="$emit('addNewPost')">+</button>
      <nuxt-link to="/friends" class="flex flex-col text-xxs no-underline text-grey-darkest mx-6">
        <img src="~/assets/img/icons/friends.svg" class="h-5 mb-1" />
        <span>Friends</span>
      </nuxt-link>
    </div>
</template>
<script>
export default {
  props: ['menuOpen']
}
</script>
<style lang="scss" scoped>
.footer-bar {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.toggle-menu {
  transition: transform 150ms ease;
  outline: none;
  &.menu-open {
    transform: rotate(135deg);
  }
}
</style>
