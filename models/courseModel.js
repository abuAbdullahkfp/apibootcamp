const mongoose = require('mongoose')


const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: [true, 'Please add a course title']  
  },
  description: {
    type: String, 
    require: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    require: [true, 'Please add number of weeks']
  },
  tuition: {
    type: Number,
    require: [true, 'Please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    require: true
  }
}, {timestamps:true})



module.exports = mongoose.model("Course", CourseSchema) 