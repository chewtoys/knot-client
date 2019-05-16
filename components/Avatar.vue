<template>
  <CldImage
    v-if="user.profile_image"
    :public-id="user.profile_image"
    :alt="user.name"
    :width="size"
    :height="size"
    crop="lfill"
    class="avatar"
    responsive="width" />
  <img
    v-else
    :src="fallback"
    :width="size"
    :height="size"
    :alt="user.name"
    class="avatar">
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object,
      required: true
    },
    fallback: {
      type: String,
      default: '/avatar-default.jpg'
    },
    size: {
      type: Number,
      default: 35
    }
  }
}
</script>
