<style scoped src="./style/login.css"></style>
<template>
  <form class="sign-up form" @submit.prevent="registerUser">
    <h3>Register</h3>
    <input
      class="input"
      type="text"
      placeholder="Name"
      v-model="register.name"
      required
    />
    <input
      class="input"
      type="text"
      placeholder="Email"
      v-model="register.email"
      required
    />
    <input
      class="input"
      type="password"
      placeholder="Password"
      v-model="register.password"
      required
    />
    <p>
      Already have an account ?
      <router-link to="/"><strong> Sign in here</strong></router-link>
    </p>
    <button class="input-btn" type="submit">
      Register
    </button>
  </form>
</template>
<script>
import swal from 'sweetalert'
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async registerUser() {
      try {
        let response = await this.$http.post('/user/register', this.register)
        console.log(response)
        let token = response.data.token
        if (token) {
          localStorage.setItem('jwt', token)
          this.$router.push('/')
          swal('Success', 'Registration Was successful', 'success')
        } else {
          swal('Error', 'Something Went Wrong', 'error')
        }
      } catch (err) {
        let error = err.response
        if (error.status == 409) {
          swal('Error', error.data.message, 'error')
        } else {
          swal('Error', error.data.err.message, 'error')
        }
      }
    },
  },
}
</script>
