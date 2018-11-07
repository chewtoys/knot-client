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
          class="lazyload w-full">
      </div>
    </div>
    <div
      v-if="post.postable.body"
      class="p-5 text-grey-darkest leading-normal text-sm">
      <span>{{ post.postable.body }}</span>
      <span v-if="post.location || post.accompaniments.length"><strong>&mdash;</strong></span>
      <span v-if="post.accompaniments.length">with</span>
      <span
        v-for="(person, index) in post.accompaniments"
        v-if="post.accompaniments.length"
        :key="person.user_id">
        <strong>{{ person.user.first_name }}</strong><!--
        --><span v-if="post.accompaniments.length > 2 && index < post.accompaniments.length - 2">, </span><!--
        --><span v-if="post.accompaniments.length >= 2 && index === post.accompaniments.length - 2"> and </span>
      </span>
      <span v-if="post.location">at <strong>{{ post.location.name }}</strong></span>
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
import CommentForm from '~/components/post/CommentForm'
import CommentsList from '~/components/post/CommentsList'
import Reactions from '~/components/post/Reactions'
import arrayToSentence from 'array-to-sentence'
export default {
  components: {
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
  computed: {
    aspectRatio() {
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
