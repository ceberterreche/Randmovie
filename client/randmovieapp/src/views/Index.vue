<style>
@import './style/style.css';
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
</style>
<template>
  <div class="login">
    <RandomMovie
      id="movie-card"
      v-on:click.native="cardClick"
      v-on:mouseover.native="cardHover"
      v-on:mouseleave.native="cardLeave"
    />
    <Profile
      id="profile"
      v-on:click.native="profileClick"
      v-on:mouseover.native="profileHover"
      v-on:mouseleave.native="profileLeave"
    />
  </div>
</template>
<script>
import RandomMovie from '../components/random-movie'
import Profile from '../components/profile'
export default {
  components: {
    RandomMovie,
    Profile,
  },

  data() {
    return {
      hidden: false,
    }
  },

  methods: {
    cardClick: function() {
      if (this.hidden) {
        document.getElementById('movie-card').style.transform =
          'translate(0, 0)'
        document.getElementById('movie-card').style.cursor = 'auto'
        document.getElementById('profile').style.cursor = 'pointer'
        this.hidden = false
      }
    },

    cardHover: function() {
      if (this.hidden) {
        document.getElementById('movie-card').style.transform =
          'translate(-800px, 0)'
      }
    },

    cardLeave: function() {
      if (this.hidden) {
        document.getElementById('movie-card').style.transform =
          'translate(-900px, 0)'
      }
    },

    profileClick: function() {
      if (!this.hidden) {
        document.getElementById('movie-card').style.transform =
          'translate(-900px, 0)'
        document.getElementById('profile').style.cursor = 'auto'
        document.getElementById('movie-card').style.cursor = 'pointer'
        this.hidden = true
      }
    },

    profileHover: function() {
      if (!this.hidden) {
        document.getElementById('movie-card').style.transform =
          'translate(-50px, 0)'
      }
    },

    profileLeave: function() {
      if (!this.hidden) {
        document.getElementById('movie-card').style.transform =
          'translate(0, 0)'
      }
    },
  },
}
</script>
