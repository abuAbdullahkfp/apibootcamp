const mongoose = require('mongoose')   

const connectToDb = (url) => {
    return mongoose.connect(url, {
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
}

module.exports = connectToDb 