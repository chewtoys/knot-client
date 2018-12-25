<template>
  <div class="friendships overflow-y-auto scrolling-touch">
    <ul
      v-if="friendships.outgoing.length"
      class="list-reset">
      <li class="text-grey-darker bg-grey-light py-2 text-sm uppercase tracking-wide font-semibold px-4">Sent Requests</li>
      <li
        v-for="sent in friendships.outgoing"
        :key="sent.id"
        class="flex items-center p-4 bg-white border-b border-grey-light">
        <Avatar
          :user="sent.recipient"
          class="rounded-sm mr-2" />
        <div class="font-medium">{{ sent.recipient.full_name }}</div>
        <div class="ml-auto text-grey-darker bg-grey-light rounded-sm p-2 text-xs mr-2">
          Pending
        </div>
      </li>
    </ul>
    <ul
      v-if="friendships.requests.length"
      class="list-reset">
      <li class="text-grey-darker bg-grey-light py-2 text-sm uppercase tracking-wide font-semibold px-4">Friend Requests</li>
      <li
        v-for="req in friendships.requests"
        :key="req.id"
        class="flex items-center p-4 bg-white border-b border-grey-light">
        <Avatar
          :user="req.sender"
          class="rounded-sm mr-2" />
        <div class="font-medium">{{ req.sender.full_name }}</div>
        <div class="ml-auto">
          <button
            class="text-white bg-primary rounded-sm p-2 text-xs mr-2"
            @click="denyFriendship(req.sender_id)">
            Deny
          </button>
          <button
            class="text-white bg-green rounded-sm p-2 text-xs"
            @click="acceptFriendship(req.sender_id)">
            Approve
          </button>
        </div>
      </li>
    </ul>
    <ul
      v-if="friendships.friends.length"
      class="list-reset">
      <li class="text-grey-darker bg-grey-light py-2 text-sm uppercase tracking-wide font-semibold px-4">Friends</li>
      <li
        v-for="friend in friendships.friends"
        :key="friend.id"
        class="bg-white border-b border-grey-light">
        <nuxt-link
          :to="`/profile/${friend.id}`"
          class="flex items-center flex-no-shrink p-4 text-grey-darkest no-underline">
          <Avatar
            :user="friend"
            class="rounded-sm mr-2" />
          <div class="font-medium">{{ friend.full_name }}</div>
        </nuxt-link>
      </li>
    </ul>
    <ul
      v-if="friendships.suggested.length"
      class="list-reset">
      <li class="text-grey-darker bg-grey-light py-2 text-sm uppercase tracking-wide font-semibold px-4">Suggested</li>
      <li
        v-for="user in friendships.suggested"
        :key="user.id"
        class="flex items-center p-4 bg-white border-b border-grey-light">
        <Avatar
          :user="user"
          class="rounded-sm mr-2" />
        <div class="font-medium">{{ user.full_name }}</div>
        <div class="ml-auto">
          <button
            class="text-grey-darkest bg-grey-light rounded-sm p-2 text-xs"
            @click="requestFriendship(user.id)">
            Send Request
          </button>
        </div>
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
  mounted() {
    this.fetchFriendships()
  },
  methods: {
    ...mapActions([
      'fetchFriendships',
      'acceptFriendship',
      'denyFriendship',
      'requestFriendship'
    ])
  }
}
</script>
