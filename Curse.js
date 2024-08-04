const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    duration : String,
    availableSlots : Number
})

module.exports = mongoose.model('Course', CourseSchema);