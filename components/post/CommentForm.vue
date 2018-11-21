<template>
  <div class="dashboard-activity-feed-post-comment-form">
    <form @submit.prevent="doAddComment">
      <textarea
        v-model="comment.body"
        placeholder="Add a comment..." />
      <button
        :disabled="commentEmpty || postingComment"
        type="submit"
        class="button is-small is-primary">Send</button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CommentForm',
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comment: {
        id: -1,
        body: '',
        location: {}
      },
      postingComment: false
    }
  },
  computed: {
    ...mapGetters(['currentLocation']),
    commentEmpty() {
      return this.comment.body.trim() === ''
    },
    locationPostData() {
      return Object.keys(this.comment.location).length
        ? this.comment.location
        : null
    }
  },
  methods: {
    ...mapActions(['addComment']),
    doAddComment() {
      this.postingComment = true
      this.comment.id = this.postId

      if (this.currentLocation.city !== null) {
        this.comment.location = this.currentLocation
      }

      let commentData = {
        ...this.comment,
        location: this.locationPostData
      }

      this.addComment(commentData).then(res => {
        this.postingComment = false
        this.comment.body = ''
      })
    }
  }
}
</script>
<style lang="scss">
.dashboard-activity-feed-post-comment-form {
  border-top: 1px solid rgba(#000, 0.1);
  padding: 10px;
  form {
    display: flex;
    textarea {
      border: none;
      outline: none;
      flex-grow: 1;
      font-size: 13px;
      margin-right: 10px;
      min-height: 27px;
      padding: 10px;
      resize: none;
    }
    .button {
      align-self: flex-start;
    }
  }
}
</style>
