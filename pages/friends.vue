<template>
  <div class="friendships overflow-y-auto">
    <ul class="list-reset" v-if="friendships.outgoing.length">
      <li class="text-grey-darker bg-grey-light py-2 text-sm uppercase tracking-wide font-semibold px-4">Sent Requests</li>
      <li v-for="sent in friendships.outgoing" :key="sent.id" class="flex items-center p-4 border-b border-grey-lighter">
        <avatar :user="sent.recipient" class="rounded-sm mr-2"></avatar>
        <div class="font-medium">{{ sent.recipient.full_name }}</div>
        <div class="ml-auto text-grey-darker bg-grey-light rounded-sm p-2 text-xs mr-2">
          Pending
        </div>
      </li>
    </ul>
    <ul class="list-reset" v-if="friendships.requests.length">
      <li class="text-grey-darker bg-grey-light py-2 text-sm uppercase tracking-wide font-semibold px-4">Friend Requests</li>
      <li v-for="req in friendships.requests" :key="req.id" class="flex items-center p-4 border-b border-grey-lighter">
        <avatar :user="req.sender" class="rounded-sm mr-2"></avatar>
        <div class="font-medium">{{ req.sender.full_name }}</div>
        <div class="ml-auto">
          <button class="text-white bg-primary rounded-sm p-2 text-xs mr-2" @click="denyFriendship(req.sender_id)">
            Deny
          </button>
          <button class="text-white bg-green rounded-sm p-2 text-xs" @click="acceptFriendship(req.sender_id)">
            Approve
          </button>
        </div>
      </li>
    </ul>
    <ul class="list-reset" v-if="friendships.friends.length">
      <li class="text-grey-darker bg-grey-light py-2 text-sm uppercase tracking-wide font-semibold px-4">Friends</li>
      <li v-for="friend in friendships.friends" :key="friend.id" class="flex items-center p-4 border-b border-grey-lighter">
        <avatar :user="friend" class="rounded-sm mr-2"></avatar>
        <div class="font-medium">{{ friend.full_name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavigationBar from '~/components/NavigationBar'
import FooterBar from '~/components/FooterBar'
import Avatar from '~/components/Avatar'
export default {
  name: 'Friends',
  layout: 'dashboard',
  components: {
    Avatar,
    FooterBar,
    NavigationBar
  },
  computed: {
    ...mapGetters(['friendships'])
  },
  methods: {
    ...mapActions([
      'fetchFriendships',
      'acceptFriendship',
      'denyFriendship'
    ])
  }
}
</script>

<style lang="scss">
.dashboard-friends {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 44px 1fr 48px;
}
</style>
