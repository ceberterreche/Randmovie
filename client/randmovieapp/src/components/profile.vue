<template>
  <div class="profile">
    <div class="profile-left">
      <div class="inner">
        <h2>My Movies</h2>
        <div class="myMovie-list">
          <div v-for="item in movies" :key="item.title" class="myMovie">
            <img
              v-bind:src="'http://image.tmdb.org/t/p/w780/' + item.poster_path"
            />
            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-right">
      <div class="stats">
        <h2>Stats</h2>
        comedie
        <progress max="100" value="80"></progress>
        comedie
        <progress max="100" value="10"></progress>
        comedie
        <progress max="100" value="80"></progress>
        comedie
        <progress max="100" value="80"></progress>
      </div>

      <div class="discover" v-on:click="getMovies()">
        <h2>Discover</h2>
        <div class="myMovie-list discover-list">
          <div class="myMovie">
            <img src="../assets/interstellar.jpg" />
            <h3>interstellar</h3>
          </div>
          <div class="myMovie">
            <img src="../assets/interstellar.jpg" />
            <h3>interstellar</h3>
          </div>
          <div class="myMovie">
            <img src="../assets/interstellar.jpg" />
            <h3>interstellar</h3>
          </div>
          <div class="myMovie">
            <img src="../assets/interstellar.jpg" />
            <h3>interstellar</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert'
export default {
  data() {
    return {
      movies: [],
    }
  },
  methods: {
    async getMovies() {
      try {
        let response = await this.$http.get('/movie/getMovies')
        console.log('response' + JSON.stringify(response))
        this.movies = response.data
      } catch (err) {
        swal('Error', 'Something Went Wrong', 'error')
        console.log(err.response)
      }
    },
  },

  mounted() {
    this.getMovies()
  },
}
</script>
