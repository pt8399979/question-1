const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./Routes/user");
const courseRouter = require('./Routes/course')


mongoose.connect('mongodb://127.0.0.1:27017/course-management',{
    userNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('sever is runing on port ${port}');
})