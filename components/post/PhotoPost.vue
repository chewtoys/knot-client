<template>
  <div class="bg-white block mb-12 w-full">
    <PostHeader :post="post" />
    <div
      :style="{ paddingBottom: aspectRatio}"
      class="h-0 relative bg-grey-lightest">
      <div class="absolute pin-t pin-l w-full h-full">
        <CldImage
          :public-id="`${post.postable.image_path}.jpg`"
          :alt="post.postable.body"
          responsive="width"
          class="lazyload w-full"
          crop="scale"
          @click.native="openPhoto(post.postable, $event)" />
      </div>
    </div>
    <PostBody
      v-if="post.postable.body"
      :post="post" />
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
import cloudinary from 'cloudinary-core'
import PostBody from '~/components/post/PostBody'
import PostHeader from '~/components/post/PostHeader'
import CommentForm from '~/components/post/CommentForm'
import CommentsList from '~/components/post/CommentsList'
import Reactions from '~/components/post/Reactions'
export default {
  components: {
    PostBody,
    PostHeader,
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
  data: () => ({
    cloudinaryCore: null
  }),
  computed: {
    aspectRatio() {
      return `${(this.post.postable.height / this.post.postable.width) * 100}%`
    },
    cloudinaryUrl() {
      if (this.cloudinaryCore) {
        return this.cloudinaryCore.url(this.post.postable.image_path)
      } else {
        return null
      }
    }
  },
  mounted() {
    this.cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'knot' })
  },
  methods: {
    openPhoto(post, e) {
      const targetRect = e.target.getBoundingClientRect()
      this.$bus.$emit('OPEN_IMAGE', {
        src: this.cloudinaryUrl,
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
