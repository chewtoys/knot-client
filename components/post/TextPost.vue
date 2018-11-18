<template>
  <div class="dashboard-activity-feed-post text-post bg-white mb-12">
    <PostHeader :post="post" />
    <div class="border-t border-grey-light p-5 text-grey-darkest leading-normal text-sm">
      <span>{{ post.postable.body }}</span>
      <PostMeta :post="post" />
    </div>
    <Reactions
      v-show="post.reactions.length"
      :post="post"/>
    <CommentsList
      v-show="post.comments.length"
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
  }
}
</script>
<style lang="scss">
.dashboard-activity-feed-post {
  transition: all 350ms cubic-bezier(0.42, 0, 0.58, 1);
}
</style>
