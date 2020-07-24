<template>
  <div class="random-movie">
    <div
      class="background-poster"
      v-bind:style="{
        backgroundImage:
          'url(' +
          'http://image.tmdb.org/t/p/w780/' +
          current_movie.poster_path +
          ')',
      }"
    >
      <div class="note-container">
        <div v-bind:class="noteColor">{{ current_movie.vote_average }}</div>
      </div>
    </div>

    <div class="movie-infos">
      <div
        class="poster"
        v-bind:style="{
          backgroundImage:
            'url(' +
            'http://image.tmdb.org/t/p/w780/' +
            current_movie.poster_path +
            ')',
        }"
      ></div>
      <div class="infos-container">
        <div class="infos">
          <h1>{{ current_movie.title }}</h1>
          <p>{{ current_movie.release_date }} * {{ buildMovieGenre() }}</p>
        </div>
      </div>
    </div>

    <div class="synopsis-container">
      <h2>Synopsis</h2>
      <div class="synopsis">
        {{ current_movie.overview }}
      </div>
    </div>

    <div class="choice-container">
      <div
        v-on:click="generateMovie(false)"
        class="choice-btn dislike"
        style="line-height: 32px;"
      >
        <h2>I DONT LIKE</h2>
      </div>
      <div v-on:click="generateMovie(true)" class="choice-btn like">
        <h2>I LIKE</h2>
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

      api_movies: [],
      api_genres: [],
      current_movie: {
        User: '',
        title: '',
        poster_path: '',
        overview: '',
        vote_average: 0,
        release_date: '',
        liked: false,
        genres: [],
      },
      noteColor: 'note note6',
    }
  },

  methods: {
    getUserDetails() {
      let token = localStorage.getItem('jwt')
      let decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },

    generateMovie: async function(liked) {
      // post the current movie
      if (liked) {
        this.current_movie.liked = liked
        await this.$http.post('/movie/addMovie', this.current_movie)
      }

      this.$root.$emit('updateProfile')
      // generate a new movie
      this.getRandomMovie()
    },

    populateCurrentMovie: function(api_movie) {
      console.log(this.user._id)
      this.current_movie.User = this.user._id
      this.current_movie.title = api_movie.title
      this.current_movie.poster_path = api_movie.poster_path
      this.current_movie.overview = api_movie.overview
      this.current_movie.vote_average = api_movie.vote_average
      this.current_movie.release_date = api_movie.release_date
      this.current_movie.genres = []
      api_movie.genre_ids.forEach((genre_id) => {
        this.api_genres.forEach((genre) => {
          if (genre.id == genre_id) {
            this.current_movie.genres.push(genre.name)
          }
        })
      })
    },

    setNoteColor: function() {
      var note = this.current_movie.vote_average
      if (note <= 2.0) {
        this.noteColor = 'note note2'
      } else if (note <= 4) {
        this.noteColor = 'note note4'
      } else if (note <= 6) {
        this.noteColor = 'note note6'
      } else if (note <= 8) {
        this.noteColor = 'note note8'
      } else if (note <= 10) {
        this.noteColor = 'note note10'
      }
    },

    buildMovieGenre: function() {
      var genreStr = ' '
      for (var i = 0; i < this.current_movie.genres.length; i++) {
        if (i == this.current_movie.genres.length - 1) {
          genreStr += ' ' + this.current_movie.genres[i] + ' '
        } else {
          genreStr += ' ' + this.current_movie.genres[i] + ','
        }
      }
      return genreStr
    },

    getRandomMovie: async function() {
      var random_page = Math.floor(Math.random() * 500)
      var random_result = Math.floor(Math.random() * 20)
      await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=21232daa602e58908c7ddee42de408db&language=en-US&sort_by=popularity.desc&include_adult=false&page=' +
          random_page
      )
        .then((response) => response.json())
        .then((data) => {
          this.populateCurrentMovie(data.results[random_result])
          this.setNoteColor()
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },

  async mounted() {
    this.getUserDetails()
    // Get all movie genre
    await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=21232daa602e58908c7ddee42de408db&language=en-US'
    )
      .then((response) => response.json())
      .then((data) => {
        this.api_genres = data.genres
      })

    this.getRandomMovie()
  },
}
</script>
