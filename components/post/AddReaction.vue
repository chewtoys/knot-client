<template>
  <ul class="reactions list-reset h-8 absolute pin-t pin-r mr-10 flex items-center px-1">
    <li
      v-for="(path, key) in reactions"
      :key="key"
      class="reaction cursor-pointer ml-3 w-6 h-6"
      @click="doAddReaction(key)">
      <img :src="path">
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddReaction',
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      reactions: {
        smile: '/reactions/smile.svg',
        love: '/reactions/love.svg',
        frown: '/reactions/frown.svg',
        surprise: '/reactions/surprise.svg',
        laugh: '/reactions/laugh.svg',
        angry: '/reactions/angry.svg'
      }
    }
  },
  methods: {
    ...mapActions(['addReaction']),
    doAddReaction(reaction) {
      this.$emit('hide')
      this.addReaction({
        id: this.postId,
        reaction: { type: reaction }
      })
    }
  }
}
</script>

<style lang="scss">
.reactions {
  background: rgba(#000, 0.5);
  border-radius: 34px;
  &-enter-active,
  &-leave-active {
    transition: opacity 175ms cubic-bezier(0.42, 0, 0.58, 1),
      transform 175ms cubic-bezier(0.42, 0, 0.58, 1);
  }
  &-enter,
  &-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
  .reaction {
    &:first-child {
      margin-left: 0;
    }
    img {
      transition: transform 250ms ease;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
