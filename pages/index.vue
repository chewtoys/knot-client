<template>
  <div class="overflow-y-auto scrolling-touch">
    <ActivityFeed :posts="timeline.data" />
    <div
      ref="scrollObserver"
      class="h-4" />
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
    ...mapGetters(['user', 'timeline'])
  },
  watch: {
    timeline: function() {
      this.bindIntersectionObserver()
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.observer = null
      await this.fetchTimeline()
    })
  },
  methods: {
    ...mapActions(['fetchTimeline']),
    bindIntersectionObserver() {
      if (this.observer) {
        this.observer.disconnect()
      }

      this.observer = null
      this.observer = new IntersectionObserver(([entry], observer) => {
        if (entry.intersectionRatio > 0) {
          if (this.timeline.current_page < this.timeline.last_page) {
            this.fetchTimeline(this.timeline.current_page + 1)
          } else {
            observer.disconnect()
          }
        }
      })
      this.observer.observe(this.$refs.scrollObserver)
    }
  }
}
</script>
