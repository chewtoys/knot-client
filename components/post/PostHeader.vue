<template>
  <div class="flex items-center px-5 h-16">
    <Avatar
      :user="post.user"
      class="rounded-sm mr-3" />
    <div class="flex flex-col">
      <div class="text-grey-darkest text-sm font-semibold mb-1">{{ post.user.first_name }}</div>
      <LiveDate
        :date="post.created_at"
        class="text-xs text-grey-dark" />
    </div>
    <div class="dashboard-add-reaction-container relative ml-auto">
      <transition name="reactions">
        <AddReaction
          v-show="showReactions"
          :id="post.id"
          @hide="showReactions = false" />
      </transition>
      <div
        class="toggle-reactions flex items-center justify-center rounded-full bg-grey-lighter h-8 w-8 cursor-pointer"
        @click="showReactions = !showReactions">
        <img
          v-show="!showReactions"
          src="~assets/img/icons/heart.svg"
          class="h-4">
        <span
          v-show="showReactions"
          class="text-grey">&times;</span>
      </div>
    </div>
  </div>
</template>
<script>
import AddReaction from '~/components/post/AddReaction'
import LiveDate from '~/components/LiveDate'
import Avatar from '~/components/Avatar'
export default {
  name: 'PostHeader',
  components: {
    AddReaction,
    Avatar,
    LiveDate
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showReactions: false,
      reactions: {
        smile: '/reactions/smile.svg',
        love: '/reactions/love.svg',
        frown: '/reactions/frown.svg',
        surprise: '/reactions/surprise.svg',
        laugh: '/reactions/laugh.svg',
        angry: '/reactions/angry.svg'
      }
    }
  }
}
</script>
