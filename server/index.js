const express = require('express')
const PORT = process.env.PORT || 4000
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/connect')
const app = express()
//configure database and mongoose
// Connect Database
connectDB()
// db configuaration ends here
//registering cors
app.use(cors())
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//configure body-parser ends here
app.use(morgan('dev')) // configire morgan
// define first route
app.get('/', (req, res) => {
  console.log('Hello MEVN Soldier')
})
const userRoutes = require('./route/user')
const movieRoutes = require('./route/movie')
app.use('/user', userRoutes)
app.use('/movie', movieRoutes)
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})
