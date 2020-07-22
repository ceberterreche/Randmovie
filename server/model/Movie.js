const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: [true],
  },
  poster_path: {
    type: String,
    required: [true],
  },
  overview: {
    type: String,
    required: [true],
  },
  vote_average: {
    type: Number,
    required: [true],
  },
  release_date: {
    type: String,
    required: [true],
  },
  liked: {
    type: Boolean,
    required: [true],
  },

  genres: [
    {
      type: String,
      required: true,
    },
  ],
})

movieSchema.statics.findByTitle = async (title) => {
  const movie = await Movie.findOne({ title })
  return movie
}

movieSchema.statics.findByUser = async (user) => {
  const movie = await Movie.find({ user })
  return movie
}

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
