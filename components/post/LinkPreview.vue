<template>
  <div>
    <slot
      v-if="res"
      :title="res.title"
      :description="res.description"
      :image="res.image"
    />
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data: () => ({
    res: null
  }),
  mounted() {
    const cached = this.$warehouse.get(this.url)
    if (cached) {
      this.res = cached
    } else {
      axios
        .post('https://api.linkpreview.net', {
          q: this.url,
          key: process.env.LINK_PREVIEW_API_KEY
        })
        .then(res => {
          const expiration = new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          this.res = res.data
          this.$warehouse.set(this.url, res.data, expiration)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
