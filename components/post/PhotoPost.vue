<template>
  <div class="bg-white block mb-12 w-full">
    <PostHeader :post="post" />
    <div
      :style="{ paddingBottom: aspectRatio}"
      class="h-0 relative bg-grey-lightest">
      <div class="absolute pin-t pin-l w-full h-full">
        <img
          :data-src="post.postable.image_url"
          :alt="post.postable.body"
          class="lazyload w-full"
          @click="openPhoto(post.postable, $event)">
      </div>
    </div>
    <div
      v-if="post.postable.body"
      class="p-5 text-grey-darkest leading-normal text-sm">
      <span>{{ post.postable.body }}</span>
      <PostMeta :post="post" />
    </div>
    <Reactions
      v-if="post.reactions.length"
      :post="post" />
    <CommentsList
      v-if="post.comments.length"
      :comments="post.comments" />
    <CommentForm :post-id="post.id" />
  </div>
</template>
<script>
import PostHeader from '~/components/post/PostHeader'
import PostMeta from '~/components/post/PostMeta'
import CommentForm from '~/components/post/CommentForm'
import CommentsList from '~/components/post/CommentsList'
import Reactions from '~/components/post/Reactions'
export default {
  components: {
    PostHeader,
    PostMeta,
    CommentForm,
    CommentsList,
    Reactions
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    aspectRatio() {
      return `${(this.post.postable.height / this.post.postable.width) * 100}%`
    }
  },
  methods: {
    openPhoto(post, e) {
      const targetRect = e.target.getBoundingClientRect()
      this.$bus.$emit('OPEN_IMAGE', {
        src: post.image_url,
        w: post.width,
        h: post.height,
        thumb: {
          x: targetRect.left,
          y: targetRect.top,
          w: targetRect.width
        }
      })
    }
  }
}
</script>
<style lang="scss">
.lazyload,
.lazyloading {
  opacity: 0;
}
.lazyloaded {
  opacity: 1;
  transition: opacity 300ms;
}
.dashboard-activity-feed-post {
  transition: all 350ms cubic-bezier(0.42, 0, 0.58, 1);
}
</style>
