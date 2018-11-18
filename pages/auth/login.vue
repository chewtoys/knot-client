<template>
  <section class="auth h-screen bg-primary flex flex-col justify-center px-4">
    <img
      src="~assets/img/knot.svg"
      class="h-12 mb-12">
    <form
      class="flex flex-col p-4 bg-white rounded sm shadow mb-10"
      @submit.prevent="doLogin">
      <input
        v-model="credentials.email"
        type="email"
        class="auth-text-input"
        placeholder="Email">
      <input
        v-model="credentials.password"
        type="password"
        class="auth-text-input"
        placeholder="Password">
      <button
        type="submit"
        class="w-full bg-primary px-3 py-3 text-white rounded-sm mt-3">Sign In</button>
    </form>
    <div class="px-4 w-full">
      <nuxt-link
        to="/auth/register"
        class="block w-full bg-white px-3 py-3 text-primary text-center no-underline rounded-sm mt-3">No account? Sign up</nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware: 'guest',
  components: {},
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login', 'fetchUser']),
    async doLogin() {
      await this.login(this.credentials)
      await this.fetchUser()
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
