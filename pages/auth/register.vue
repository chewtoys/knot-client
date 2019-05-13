<template>
  <section class="auth h-screen bg-primary flex flex-col justify-center px-4">
    <img
      src="~assets/img/knot.svg"
      class="h-12 mb-12">
    <form
      class="flex flex-col p-4 bg-white rounded sm shadow mb-10"
      @submit.prevent="registerUser">
      <input
        v-model="user.first_name"
        type="text"
        class="auth-text-input"
        placeholder="First name">
      <input
        v-model="user.last_name"
        type="text"
        class="auth-text-input"
        placeholder="Last name">
      <input
        v-model="user.email"
        type="email"
        class="auth-text-input"
        placeholder="Email">
      <input
        v-model="user.password"
        type="password"
        class="auth-text-input"
        placeholder="Password">
      <input
        v-model="user.password_confirmation"
        type="password"
        class="auth-text-input"
        placeholder="Confirm password">
      <button
        type="submit"
        class="w-full bg-primary px-3 py-3 text-white rounded-sm mt-3">Sign Up</button>
    </form>
    <div class="px-4 w-full">
      <nuxt-link
        to="/auth/login"
        class="block w-full bg-white px-3 py-3 text-primary text-center no-underline rounded-sm mt-3">Have an account? Sign in</nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  auth: false,
  components: {},
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions(['login', 'register', 'fetchUser']),
    async registerUser() {
      await this.register(this.user)
      await this.login({ email: this.user.email, password: this.user.password })
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
