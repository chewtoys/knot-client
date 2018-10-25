<template>
  <div class="dashboard-activity-feed-post text-post bg-white mb-12">
    <post-header :post="post"></post-header>
    <div class="border-t border-grey-light p-5 text-grey-darkest leading-normal text-sm">
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
  props: ['post']
}
</script>
<style lang="scss">
.dashboard-activity-feed-post {
  transition: all 350ms cubic-bezier(0.42, 0, 0.58, 1);
}
</style>



