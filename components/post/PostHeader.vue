<template>
<div class="flex items-center px-5 h-16">
  <avatar :user="post.user" class="rounded-sm mr-3"></avatar>
  <div class="flex flex-col">
    <div class="text-grey-darkest text-sm font-semibold mb-1">{{ post.user.first_name }}</div>
    <live-date class="text-xs text-grey-dark" :date="post.created_at"></live-date>
  </div>
  <div class="dashboard-add-reaction-container relative ml-auto">
    <transition name="reactions">
      <add-reaction :id="post.id" v-show="showReactions" @hide="showReactions = false"></add-reaction>
    </transition>
    <div class="toggle-reactions flex items-center justify-center rounded-full bg-grey-lighter h-8 w-8 cursor-pointer" @click="showReactions = !showReactions">
      <img src="~assets/img/icons/heart.svg" class="h-4" v-show="!showReactions" />
      <span class="text-grey" v-show="showReactions">&times;</span>
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
  props: ['post'],
  data () {
    return {
      showReactions: false,
      reactions: {
        'smile': '/reactions/smile.svg',
        'love': '/reactions/love.svg',
        'frown': '/reactions/frown.svg',
        'surprise': '/reactions/surprise.svg',
        'laugh': '/reactions/laugh.svg',
        'angry': '/reactions/angry.svg'
      }
    }
  }
}
</script>
<style lang="scss">
// .dashboard-activity-feed-post-header {
//   display: flex;
//   align-items: center;
//   height: 64px;
//   padding: 0 20px;
//   .dashboard-activity-feed-post-avatar {
//     width: 35px; height: 35px;
//     margin-right: 10px;
//     img {
//       border-radius: 2px;
//     }
//   }
//   .dashboard-activity-feed-post-header-content {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     height: 35px;
//   }
//   .dashboard-activity-feed-post-author {
//     font-size: 15px;
//     font-weight: bold;
//   }
//   .dashboard-activity-feed-post-creation-date {
//     color: #b4b4b4;
//     font-size: 13px;
//   }

//   .dashboard-add-reaction-container {
//     margin-left: auto;
//     position: relative;
//   }
//   .toggle-reactions {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: #eee;
//     border-radius: 50%;
//     color: #cacbca;
//     cursor: pointer;
//     font-size: 18px;
//     line-height: 1;
//     margin-left: 10px;
//     text-align: center;
//     width: 24px; height: 24px;
//     img {
//       width: 12px;
//     }
//   }
// }
</style>


