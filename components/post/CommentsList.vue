<template>
  <ul class="post-comments list-reset">
    <li class="flex items-start px-5 py-4 border-t border-grey-light" v-for="comment in comments" :key="comment.id">
      <Avatar :user="comment.user" :size="30" class="rounded-sm mr-2"></Avatar>
      <div>
        <div class="text-sm mb-1">
          <strong>{{ comment.user.first_name }}: </strong> {{ comment.body }}
        </div>
        <div class="text-xs text-grey-dark">
          <live-date :date="comment.created_at"></live-date>
          <span v-if="comment.location"> from {{ comment.location.city }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from '~/components/Avatar'
import LiveDate from '~/components/LiveDate'
export default {
  name: 'CommentsList',
  components: {
    Avatar,
    LiveDate
  },
  props: ['comments']
}
</script>

<style lang="scss">
</style>
