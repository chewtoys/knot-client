<template>
  <div class="dashboard-activity-feed-post-comment-form">
    <form
      class="flex items-start py-4 pr-5"
      @submit.prevent="doAddComment">
      <textarea
        v-model="comment.body"
        class="text-sm px-5"
        placeholder="Add a comment..." />
      <transition name="fade">
        <button
          v-if="!commentEmpty"
          :disabled="postingComment"
          type="submit"
          class="rounded-full uppercase text-white tracking-wide font-medium bg-primary py-1 px-2 text-xs">Send</button>
      </transition>
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
  textarea {
    border: none;
    outline: none;
    flex-grow: 1;
    min-height: 27px;
    resize: none;
  }
}
</style>
