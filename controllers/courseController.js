const mongoose = require('mongoose');
const Course = mongoose.model('Course');

exports.getHome = (req, res) => {
	res.render('layout', {title: 'Dashboard'})
}

exports.addCourse = (req, res) => {
	res.render('addCourse', {title: 'Add Course'});
}

exports.saveCourse = async (req, res) => {
	const course = new Course(req.body);
	await course.save()
	res.json(course)
	//res.send("IT works")
}

exports.viewCourse = async(req, res) => {
	// const view = await Course.find()
	 const day = await Course.getCourseByday()
	 // const timePromise = Course.find({days: dayPromise._id})
	 // const timePromise = Course.getCourseByTime()
	 // const  = await Promise.all([dayPromise, timePromise]);
	  // res.render('view', {title: 'View Table', daytime})
	 res.json(day)
}