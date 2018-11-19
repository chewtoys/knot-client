<template>
  <div class="overflow-y-auto scrolling-touch">
    <ActivityFeed :posts="feed.data" />
    <div
      ref="scrollObserver"
      class="h-12" />
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
    this.$nextTick(() => {
      this.fetchFeed()
      const observer = new IntersectionObserver(([entry], observer) => {
        if (entry.intersectionRatio > 0) {
          if (this.feed.current_page < this.feed.last_page) {
            this.fetchFeed(this.feed.current_page + 1)
          } else {
            observer.disconnect()
          }
        }
      })
      observer.observe(this.$refs.scrollObserver)
    })
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
