<template>
<div class="post-reactions border-t border-grey-light px-5 pt-2 pb-0">
  <ul class="post-reaction-list list-reset flex flex-wrap">
    <li class="post-reaction leading-none mr-2 mb-2 relative" v-for="reaction in post.reactions" :key="reaction.id">
      <Avatar :size="25" :user="reaction.user" class="rounded-sm"></Avatar>
      <img :src="reactionIconPath(reaction)" width="18" height="18" class="post-reaction-icon absolute w-4 h-4" />
    </li>
  </ul>
</div>
</template>

<script>
import Avatar from '~/components/Avatar'
export default {
  name: 'Reactions',
  components: {
    Avatar
  },
  props: ['post'],
  methods: {
    reactionIconPath (reaction) {
      // TODO: Move these to their own module
      const reactions = {
        'smile': '/reactions/smile.svg',
        'love': '/reactions/love.svg',
        'frown': '/reactions/frown.svg',
        'surprise': '/reactions/surprise.svg',
        'laugh': '/reactions/laugh.svg',
        'angry': '/reactions/angry.svg'
      }

      return reactions[reaction.type]
    }
  }
}
</script>

<style lang="scss">
img.post-reaction-icon {
  position: absolute;
  bottom: 0px;
  right: -4px;
}
</style>
