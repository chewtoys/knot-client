<template>
  <span>{{ liveDate }}</span>
</template>

<script>
import moment from 'moment-timezone'
export default {
  name: 'LiveDate',
  props: {
    date: {
      type: String,
      default: '0000-00-00 00:00:00'
    }
  },
  data() {
    return {
      liveDate: moment.tz(this.date, 'UTC').fromNow()
    }
  },
  created() {
    setInterval(() => {
      this.liveDate = moment.tz(this.date, 'UTC').fromNow()
    }, 1000 * 60)
  }
}
</script>
