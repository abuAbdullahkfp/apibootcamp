const express = require('express')  
const morgan = require('morgan')
const connectToDb = require('./db/mongodb')
const app = express()
const bootcampRoute = require('./routes/bootcampRoute')
const courseRoute = require('./routes/courseRouter')
const chalk = require('chalk')
const errorHandler = require('./middleware/errorMid')


const PORT = process.env.PORT || 5000

app.use(express.json())

if (process.env.DEBUG) {
  app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps',bootcampRoute)
// app.use('/api/v1/courses', courseRoute)
app.use(errorHandler)

const start = async () => {
  try {
    await connectToDb(process.env.DB_URL).then(() => console.log(chalk.blueBright.bold('connected to db')))
    app.listen(PORT, () =>
      console.log(chalk.yellow.bold(`Server up on port ${PORT}`))
    );
  } catch (e) {
    console.log(e) 
  } 
}

start() 