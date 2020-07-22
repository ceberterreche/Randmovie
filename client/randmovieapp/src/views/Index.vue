<style>
@import './style/style.css';
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
</style>
<template>
  <div class="login">
    <RandomMovie id="rand" />
    <Profile
      id="profile"
      v-on:click.native="moveRand"
      v-on:mouseover.native="profileHover"
      v-on:mouseleave.native="mouseleave"
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
      move: false,
    }
  },

  methods: {
    moveRand: function() {
      var card = document.getElementById('rand')
      if (!this.move) {
        card.style.transform = 'translate(-900px, 0)'
        document.getElementById('profile').style.cursor = 'auto'
        card.style.cursor = 'pointer'
        this.move = true
      } else {
        card.style.transform = 'translate(0px, 0)'
        document.getElementById('profile').style.cursor = 'pointer'
        card.style.cursor = 'auto'
        this.move = false
      }
    },

    profileHover: function() {
      if (!this.move) {
        var card = document.getElementById('rand')
        card.style.transform = 'translate(-50px, 0)'
      }
    },
    mouseleave: function() {
      if (!this.move) {
        var card = document.getElementById('rand')
        card.style.transform = 'translate(0px, 0)'
      }
    },
  },
}
</script>
