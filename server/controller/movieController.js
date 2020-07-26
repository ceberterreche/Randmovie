const Movie = require('../model/Movie')

exports.addingMovie = async (req, res) => {
  try {
    const {
      User,
      title,
      poster_path,
      overview,
      vote_average,
      release_date,
      liked,
      genres,
    } = req.body

    let movie = await Movie.findOne({ title })
    if (movie) {
      return res.status(409).json({
        message: 'Movie already added',
      })
    }

    const newMovie = new Movie({
      User: User,
      title: title,
      poster_path: poster_path,
      overview: overview,
      vote_average: vote_average,
      release_date: release_date,
      liked: liked,
      genres: genres,
    })
    let data = await newMovie.save()
    res.status(201).json({ data })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.deleteMovie = async (req, res) => {
  console.log('prout')
  try {
    await Movie.findOneAndDelete({
      title: req.params.title,
      User: req.params.user,
    })
    res.status(201).json(movies)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.getMovies = async (req, res) => {
  try {
    console.log(req.params.user)
    let movies = await Movie.find({ liked: true, User: req.params.user })
    res.json(movies)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}
