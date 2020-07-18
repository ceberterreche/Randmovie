var app = new Vue({
  el: '#app',
  data() {
    return {
      movies: [],
      allGenres: [],
      movieGenre: [],
      favoriteGenre: [],
      noteColor: 'note note6',
      movie: {},
      page: 1,
      result: 1,
    }
  },

  methods: {
    setNextMovie: function () {
      console.log('prout')
      var movie = this.movies.results[this.result]
      this.result += 1
      this.movie = movie
      this.getMovieGenre()
      this.setNoteColor()
      console.log(this.noteColor)
    },

    getMovieGenre: function () {
      this.movieGenre = []
      this.movie.genre_ids.forEach((genre_id) => {
        this.allGenres.forEach((genre) => {
          if (genre.id == genre_id) {
            this.movieGenre.push(genre.name)
          }
        })
      })

      console.log(this.movieGenre)
    },

    setNoteColor: function () {
      var note = this.movie.vote_average
      console.log(note)
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

    buildMovieGenre: function () {
      var genreStr = ' '
      for (i = 0; i < this.movieGenre.length; i++) {
        if (i == this.movieGenre.length - 1) {
          genreStr += ' ' + this.movieGenre[i] + ' '
        } else {
          genreStr += ' ' + this.movieGenre[i] + ','
        }
      }
      return genreStr
    },
  },

  mounted() {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=21232daa602e58908c7ddee42de408db&sort_by=popularity.desc'
    )
      .then((response) => response.json())
      .then((data) => {
        this.movies = data
        this.movie = data.results[0]
        this.getMovieGenre()
      })

    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=21232daa602e58908c7ddee42de408db&language=en-US'
    )
      .then((response) => response.json())
      .then((data) => {
        this.allGenres = data.genres
      })
  },

  computed: {},
})
