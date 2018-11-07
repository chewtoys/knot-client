<template>
  <div class="dashboard-activity-feed-post text-post bg-white mb-12">
    <PostHeader :post="post" />
    <div class="border-t border-grey-light p-5 text-grey-darkest leading-normal text-sm">
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
