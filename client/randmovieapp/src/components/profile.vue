<head>
<script
  src="https://kit.fontawesome.com/3ef7cf2c01.js"
  crossorigin="anonymous"
></script>
</head>

<template>
  <div class="profile">
    <div class="profile-left">
      <div class="inner">
        <h2>My Movies</h2>
        <div class="myMovie-list">
          <div v-for="item in movies" :key="item.title" class="myMovie">
            <div class="img-container">
              <img
                v-bind:src="
                  'http://image.tmdb.org/t/p/w780/' + item.poster_path
                "
                v-on:click="deleteMovie(item.title)"
              />
              <div class="delete">DELETE</div>
            </div>

            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-right">
      <div class="header">
        <h3>
          Hello <strong>{{ user.name }} !</strong>
        </h3>

        <div class="log-out" v-on:click="logUserOut()"></div>
      </div>
      <div class="stats">
        <div
          class="stat-progress"
          v-for="item in favorite_genres"
          :key="item.id"
        >
          {{ item.name }}
          <progress v-bind:max="nb_vote" v-bind:value="item.nb"></progress>
        </div>
      </div>

      <div class="discover">
        <h2>Discover</h2>
        <div class="myMovie-list discover-list">
          <div class="myMovie" v-for="item in movie_discover" :key="item.title">
            <img
              v-bind:src="'http://image.tmdb.org/t/p/w780/' + item.poster_path"
            />
            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      user: {},

      movies: [],
      genres: {},
      favorite_genres: [],
      movie_discover: [],
      nb_vote: 0,
    }
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem('jwt')
      let decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },
    logUserOut() {
      localStorage.removeItem('jwt')
      this.$router.push('/')
    },

    async getMovies() {
      try {
        let response = await this.$http.get('/movie/getMovies/' + this.user._id)
        this.movies = response.data
        this.generateStats()
      } catch (err) {
        console.log(err)
      }
    },
    generateStats: function() {
      this.movies.forEach((movie) => {
        if (movie.liked) {
          movie.genres.forEach((genre) => {
            this.genres.forEach((item) => {
              if (item.name === genre) {
                item.nb += 1
              }
            })
          })
        }
      })
      console.log(JSON.stringify(this.genres))
      var sorted_genres = this.genres.sort(function(first, second) {
        return second.nb - first.nb
      })

      this.favorite_genres = sorted_genres.slice(0, 6)
      console.log(JSON.stringify(this.favorite_genres))
      this.nb_vote = 0
      this.favorite_genres.forEach((genre) => {
        this.nb_vote += genre.nb
      })

      console.log(this.nb_vote)
      this.generateDiscover()
    },

    generateDiscover: async function() {
      try {
        await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=21232daa602e58908c7ddee42de408db&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' +
            this.favorite_genres[0].id +
            ',' +
            this.favorite_genres[1].id
        )
          .then((response) => response.json())
          .then((data) => {
            this.movie_discover = data.results.slice(0, 6)
          })
      } catch (err) {
        console.log(err)
      }
    },

    getAllGenres: async function() {
      try {
        await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=21232daa602e58908c7ddee42de408db&language=en-US'
        )
          .then((response) => response.json())
          .then((data) => {
            this.genres = data.genres
            this.genres.forEach((genre) => {
              genre.nb = 0
            })
          })
      } catch (err) {
        console.log(err)
      }
    },

    deleteMovie: async function(movie) {
      try {
        this.$http.delete('/movie/deleteMovie/' + this.user._id + '/' + movie)
        this.getAllGenres()
        this.getMovies()
      } catch (err) {
        console.log(err.message)
      }
    },
  },

  async mounted() {
    this.$root.$on('updateProfile', () => {
      this.getAllGenres()
      this.getMovies()
    })

    this.getUserDetails()
    this.getAllGenres()
    this.getMovies()
  },
}
</script>
