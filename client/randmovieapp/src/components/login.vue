<style scoped src="./style/login.css"></style>
<template>
  <form class="sign-up form" @submit.prevent="loginUser">
    <h3>Login</h3>
    <input
      class="input"
      type="text"
      placeholder="Email"
      v-model="login.email"
    />
    <input
      class="input"
      type="password"
      placeholder="Password"
      v-model="login.password"
    />
    <p>
      Dont have an account ?
      <router-link to="/register"><strong> click here</strong></router-link>
    </p>
    <button class="input-btn" type="submit">
      Sign in
    </button>
  </form>
</template>
<script>
import swal from 'sweetalert'
export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post('/user/login', this.login)
        let token = response.data.token
        localStorage.setItem('jwt', token)
        if (token) {
          this.$router.push('/home')
        }
      } catch (err) {
        swal('Error', 'Something Went Wrong', 'error')
        console.log(err.response)
      }
    },
  },
}
</script>
