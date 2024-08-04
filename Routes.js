const express = require('express');
const router = new express.Router();
const Course = require('./MiddlewareAuthentication');
const auth = require('./MiddlewareAuthentication');

router.get('./Curse.js', async(req, res)=>{
    const course = await Course.find({});
    res.send(course)
})

router.post('./Curse.js/:coureseId/enroll',auth, async(req, res)=>{

    const course = await Course.findById(req.params.courseId);
    if(!course){
        return res.status(404).send({error : 'Course not  found'});

    }
    if(course.availableSlots<=0){
        return res.status(404).send({error : 'No available slots'})
    }

    req.user.enrolledCourses.push(course._id);
    course.availableSlots -=1;
    await req.user.save();
    await course.save();
    res.send({message : 'Enrolled Successfully'});
    
    



} )



router.delete('/Curse.js/:courseId/enroll',auth, async(req, res)=>{
    const course = await Course.findById(req.params.courseId);
    if(!course){
        return res.status(404).send({error: 'Course not found'});

    }

    const index = req.user.enrolledCourses.indexOf(course._id);
    if(index===-1){
        return res.status(404).send({error:'Not enrolled in this course'});
    }

        req.user.enrolledCourses.splice(index, 1);
        course.availableSlots +=1;
        await req.user.save();
        await course.save();
        res.send({message: 'Enrollment cancelled succeessfully'})

});
 router.get('./user/me/course', auth , async(req, res)=>{
    await req.user.populate('enrolledCourses').execPopulation();
    res.send(req.user.enrolledCourses)
 });

 module.exports = router;