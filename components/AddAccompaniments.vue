<template>
  <div class="dashboard-page dashboard-add-accompaniments fixed pin-t pin-l w-screen h-screen">
    <NavigationBar>
      <span slot="title">People</span>
      <div
        slot="left-buttons"
        @click="hide">Cancel</div>
      <div
        slot="right-buttons"
        @click="finishedSelecting">Done</div>
    </NavigationBar>
    <ul class="people-list bg-white list-reset overflow-y-auto scrolling-touch relative">
      <li
        v-for="friend in friendships.friends"
        :key="friend.id"
        class="cursor-pointer flex items-center p-4 leading-normal border-b border-grey-light"
        @click="friendSelected(friend)">
        <Avatar
          :user="friend"
          class="rounded-sm mr-2" />
        <div class="font-medium">{{ friend.full_name }}</div>
        <div
          v-show="friendIsSelected(friend)"
          class="ml-auto leading-none">
          <img
            src="~/assets/img/icons/check.svg"
            class="h-4 relative nudge-t">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '~/components/Avatar'
import NavigationBar from '~/components/NavigationBar'
export default {
  name: 'AddAccompaniments',
  components: {
    Avatar,
    NavigationBar
  },
  props: {
    accompaniments: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selectedPeople: []
    }
  },
  computed: {
    ...mapGetters(['friendships'])
  },
  created() {
    this.selectedPeople = this.selectedPeople.concat(this.accompaniments)
  },
  methods: {
    friendSelected(friend) {
      const index = this.selectedPeople.findIndex(person => {
        return person.id === friend.id
      })
      if (index > -1) {
        this.selectedPeople.splice(index, 1)
      } else {
        this.selectedPeople.push(friend)
      }
    },
    friendIsSelected(friend) {
      return (
        this.selectedPeople.findIndex(person => person.id === friend.id) > -1
      )
    },
    finishedSelecting() {
      this.$emit('friendsSelected', this.selectedPeople)
    },
    hide() {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
.dashboard-add-accompaniments {
  display: grid;
  grid-template-rows: 44px 1fr;
  grid-template-rows: calc(44px + constant(safe-area-inset-top)) 1fr;
  grid-template-rows: calc(44px + env(safe-area-inset-top)) 1fr;
  z-index: 99999;
}
</style>
