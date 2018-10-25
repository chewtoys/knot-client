<template>
<transition-group class="dashboard-activity-feed mx-auto w-full relative pt-4 px-2" name="dashboard-activity-feed" tag="div">
  <component :is="getPostType(post)" :post="post" v-for="post in posts" :key="post.id"></component>
</transition-group>
</template>
<script>
import TextPost from '~/components/post/TextPost.vue'
import PhotoPost from '~/components/post/PhotoPost.vue'
export default {
  name: 'ActivityFeed',
  components: {
    TextPost,
    PhotoPost
  },
  props: ['posts'],
  methods: {
    getPostType (post) {
      return post.postable_type.split('\\').pop()
    }
  }
}
</script>
<style lang="scss">
.dashboard-activity-feed {
  max-width: 600px;
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: scale(1.3);
  }
  &-leave-active {
    position: absolute;
    width: 100%;
  }
}
</style>


