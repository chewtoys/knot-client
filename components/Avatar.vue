<template>
  <div
    :style="{width: size + 'px', height: size + 'px'}"
    class="overflow-hidden">
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
  </div>
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
