<template>
  <div class="post-reactions border-t border-grey-light px-5 pt-2 pb-0">
    <transition-group
      name="post-reaction-list"
      tag="ul"
      class="post-reaction-list list-reset flex flex-wrap">
      <li
        v-for="reaction in post.reactions"
        :key="reaction.id"
        class="post-reaction leading-none mr-2 mb-2 relative">
        <nuxt-link
          :to="`/profile/${reaction.user.id}`"
          class="flex-no-shrink">
          <Avatar
            :user="reaction.user"
            :size="25"
            class="rounded-sm" />
        </nuxt-link>
        <img
          :src="reactionIconPath(reaction)"
          width="18"
          height="18"
          class="post-reaction-icon absolute w-4 h-4">
      </li>
    </transition-group>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar'
export default {
  name: 'Reactions',
  components: {
    Avatar
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    reactionIconPath(reaction) {
      // TODO: Move these to their own module
      const reactions = {
        smile: '/reactions/smile.svg',
        love: '/reactions/love.svg',
        frown: '/reactions/frown.svg',
        surprise: '/reactions/surprise.svg',
        laugh: '/reactions/laugh.svg',
        angry: '/reactions/angry.svg'
      }

      return reactions[reaction.type]
    }
  }
}
</script>

<style lang="scss">
.post-reaction {
  transition: all 350ms;
}
.post-reaction-list-enter,
.post-reaction-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.post-reaction-list-leave-active {
  position: absolute;
}

img.post-reaction-icon {
  position: absolute;
  bottom: 0px;
  right: -4px;
}
</style>
