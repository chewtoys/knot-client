<template>
  <div class="overflow-y-auto scrolling-touch">
    <ActivityFeed
      :posts="timeline.data"
      @loadNextPage="loadNextPage" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActivityFeed from '~/components/ActivityFeed'
import NavigationBar from '~/components/NavigationBar'
import FooterBar from '~/components/FooterBar'
export default {
  layout: 'dashboard',
  components: {
    ActivityFeed,
    FooterBar,
    NavigationBar
  },
  computed: {
    ...mapGetters(['timeline'])
  },
  mounted() {
    this.$nextTick(async () => {
      await this.fetchTimeline()
    })
  },
  methods: {
    ...mapActions(['fetchTimeline']),
    async loadNextPage() {
      if (this.timeline.current_page < this.timeline.last_page) {
        await this.fetchTimeline(this.timeline.current_page + 1)
      }
    }
  }
}
</script>
