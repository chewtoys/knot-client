<template>
  <div class="dashboard-activity-feed mx-auto w-full relative pt-4 px-2">
    <transition-group
      name="dashboard-activity-feed-posts"
      tag="div">
      <component
        v-for="post in posts"
        :key="post.id"
        :is="getPostType(post)"
        :post="post" />
    </transition-group>
    <div
      ref="scrollObserver"
      class="h-4" />
  </div>
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
  props: {
    posts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
    observer: null
  }),
  mounted() {
    const options = {}
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('loadNextPage')
      }
    }, options)
    this.observer.observe(this.$refs.scrollObserver)
  },
  destroyed() {
    this.observer.disconnect()
  },
  methods: {
    getPostType(post) {
      return post.postable_type.split('\\').pop()
    }
  }
}
</script>
<style lang="scss">
.dashboard-activity-feed {
  max-width: 600px;
  &-posts {
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
}
</style>
