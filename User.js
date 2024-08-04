const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    enrolledCourses : [{type : mongoose.Schema.type.ObjectId, ref : 'Course'}]
})
module.exports = mongoose.model('User', UserSchema);