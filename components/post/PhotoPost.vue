<template>
  <div class="bg-white block mb-12 w-full">
    <post-header :post="post"></post-header>
    <div class="h-0 relative bg-grey-lightest" :style="{ paddingBottom: aspectRatio}">
      <div class="absolute pin-t pin-l w-full h-full">
        <img :data-src="post.postable.image_url" :alt="post.postable.body" class="lazyload w-full">
      </div>
    </div>
    <div class="p-5 text-grey-darkest leading-normal text-sm" v-if="post.postable.body">
      <span>{{ post.postable.body }}</span>
      <span v-if="post.location"><strong>&nbsp;&mdash;</strong> at <strong>{{ post.location.name }}</strong></span>
    </div>
    <reactions :post="post" v-show="post.reactions.length"></reactions>
    <comments-list :comments="post.comments" v-show="post.comments.length"></comments-list>
    <comment-form :post-id="post.id"></comment-form>
  </div>
</template>
<script>
import PostHeader from '~/components/post/PostHeader'
import CommentForm from '~/components/post/CommentForm'
import CommentsList from '~/components/post/CommentsList'
import Reactions from '~/components/post/Reactions'
export default {
  components: {
    PostHeader,
    CommentForm,
    CommentsList,
    Reactions
  },
  props: ['post'],
  computed: {
    aspectRatio () {
      return `${(this.post.postable.height / this.post.postable.width) * 100}%`
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



