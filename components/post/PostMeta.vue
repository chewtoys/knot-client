<template>
  <div
    v-if="post.location || post.accompaniments.length"
    class="inline">
    <strong>&mdash;</strong>
    <span v-if="post.accompaniments.length">with</span>
    <div
      v-if="post.accompaniments.length"
      class="inline">
      <span
        v-for="(person, index) in post.accompaniments"
        :key="person.user_id">
        <strong>{{ person.user.first_name }}</strong><!--
        --><span v-if="post.accompaniments.length > 2 && index < post.accompaniments.length - 2">, </span><!--
        --><span v-if="post.accompaniments.length >= 2 && index === post.accompaniments.length - 2"> and </span>
      </span>
    </div>
    <span v-if="post.location">at <strong>{{ post.location.name }}</strong></span>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
