const ErrorResponse = require("../utils/errorUtil")


const errorHandler = (err, req, res, next) => {
   let error = {...err}
   error.message = err.message
  
   if (err.name === 'ValidationError') {
     const message = Object.values(err.errors).map(values => values.message)
     error = new ErrorResponse(message, 422)
   }
   
   if (err.code === 11000) {
     const message = 'Duplicate field value entered'
     error = new ErrorResponse(message, 409)
   }

   if (err.name === 'CastError') {
     const message = 'Bootcamp not found with id of '+err.value 
     error = new ErrorResponse(message, 404)
   }

   res.status(error.statusCode || 500 ).json({success:false, error: error.message || err.message || 'Server Error'})
}


module.exports = errorHandler   