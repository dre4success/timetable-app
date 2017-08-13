const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const http = require('../app');
const io = require('socket.io')(http);

exports.getHome = (req, res) => {
	res.render('layout', {title: 'Dashboard'})
}

exports.addCourse = (req, res) => {
	res.render('addCourse', {title: 'Add Course'});
}
// io.on
exports.saveCourse = async (req, res) => {
	const temp = {};
	temp.courseName = req.body.courseName;
	temp.daytime = [];
	const times = req.body.daytime.time;
	const days = req.body.daytime.day;
	// console.log(times, days);
	if(Array.isArray(times)) {
	times.forEach((time, index) => {
		temp.daytime.push({time, 'day': days[index]});
	})
	var course = new Course(temp);
	await course.save()
} else {

	var course = new Course(req.body)
	await course.save()
}
	/*const course = new Course(temp);
	await course.save()*/

	req.flash('success', `Successfully added ${course.courseName} to timetable`)
	res.redirect('/')

}

exports.viewCourse = async(req, res) => {
 
	  res.render('view', {title: 'View Table'})
	  
}

exports.viewApi = async(req, res) => {

	const course = await Course.find()
	res.json(course)
	io.on('connection', (socket) => {
		console.log("new course added")
	socket.on('update', (course) => {
		io.emit('update', course);
		})
	})
}
exports.editCourse = async(req, res) => {
	const course = await Course.findOne({_id: req.params.id});
	res.render('editCourse', {title: `Edit ${course.courseName}`, course})
}  

exports.updateCourse = async(req, res) => {
	const update = {};
	update.courseName = req.body.courseName;
	update.daytime = [];
	const times = req.body.daytime.time;
	const days = req.body.daytime.day;
	if(Array.isArray(days)) {
	days.forEach((day, i) => {
		update.daytime.push({'time':times[i], day})
	})
	var course = await Course.findOneAndUpdate({ _id: req.params.id}, update, {
		new: true, // return the new store instead of the old one
		runValidators: true
	}).exec();
} else {
	var course = await Course.findOneAndUpdate({ _id: req.params.id}, req.body, {
		new: true, // return the new store instead of the old one
		runValidators: true
	}).exec();
}
	req.flash('success', `Successfully Updated ${course.courseName}`);
	res.redirect(`/view/${course._id}/edit`)
}

exports.deleteCourse = async (req, res) => {
	await Course.deleteOne({ _id: req.params.id})
	req.flash('success', 'Successfully deleted course');
	res.redirect('/view');
}