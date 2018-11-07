<template>
  <div class="dashboard-page dashboard-add-location fixed pin-t pin-l w-screen h-screen">
    <NavigationBar>
      <span slot="title">Nearby Places</span>
      <div
        slot="left-buttons"
        @click="hide">Cancel</div>
    </NavigationBar>
    <ul class="nearby-list bg-white list-reset overflow-y-auto scrolling-touch relative">
      <li
        v-for="place in nearby"
        :key="place.id"
        class="cursor-pointer flex flex-col justify-center px-5 py-2 leading-normal border-b border-grey-light"
        @click="chooseLocation(place)">
        <span>{{ place.name }}</span>
        <span class="text-grey text-xs">
          <span v-if="place.categories[0]">{{ place.categories[0].name }}</span>
          <span v-if="place.location.address">at {{ place.location.address }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavigationBar from '~/components/NavigationBar'
export default {
  name: 'AddLocation',
  components: {
    NavigationBar
  },
  computed: {
    ...mapGetters(['currentLocation', 'nearby'])
  },
  mounted() {
    if (this.currentLocation.lat) {
      this.fetchNearby({
        latitude: this.currentLocation.lat,
        longitude: this.currentLocation.long
      })
    }
  },
  methods: {
    ...mapActions(['fetchNearby']),
    chooseLocation(place) {
      const locationObj = {
        lat: +parseFloat(place.location.lat).toFixed(6),
        long: +parseFloat(place.location.lng).toFixed(6),
        name: place.name
      }
      this.$emit('locationChosen', locationObj)
    },
    hide() {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
.dashboard-add-location {
  display: grid;
  grid-template-rows: 44px 1fr;
  grid-template-rows: calc(44px + constant(safe-area-inset-top)) 1fr;
  grid-template-rows: calc(44px + env(safe-area-inset-top)) 1fr;
  z-index: 99999;
}
.nearby-list {
  ul {
    li {
      border-bottom: 1px solid #eee;
      .location-meta {
        color: #b4b4b4;
        font-size: 13px;
      }
    }
  }
}
</style>
