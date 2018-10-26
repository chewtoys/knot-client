<template>
  <div class="overflow-y-auto">
    <activity-feed :posts="feed" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActivityFeed from '~/components/ActivityFeed'
import NavigationBar from '~/components/NavigationBar'
import FooterBar from '~/components/FooterBar'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  components: {
    ActivityFeed,
    FooterBar,
    NavigationBar
  },
  computed: {
    ...mapGetters(['user', 'feed'])
  },
  mounted() {
    console.log('HENLO')
    this.fetchFeed()
  },
  methods: {
    ...mapActions(['fetchFeed'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-index {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 44px 1fr 48px;
}
</style>
