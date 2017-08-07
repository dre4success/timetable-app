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
	req.flash('success', `Successfully added ${course.courseName} to timetable`)
	res.redirect('/')
	//res.send("IT works")
}

exports.viewCourse = async(req, res) => {
	  const day = req.params.day;
	  const daytimePromise = Course.getCourse()
	  const coursePromise = Course.find({ days: day});

	  const [days, course] = await Promise.all([daytimePromise, coursePromise]);
	  
	  res.render('view', {title: 'View Table', days, day, course})
	    
	  
}
exports.editCourse = async(req, res) => {
	const course = await Course.findOne({_id: req.params.id});
	res.render('addCourse', {title: `Edit ${course.courseName}`, course})
}  

exports.updateCourse = async(req, res) => {
	const course = await Course.findOneAndUpdate({ _id: req.params.id}, req.body, {
		new: true, // return the new store instead of the old one
		runValidators: true
	}).exec();
	req.flash('success', `Successfully Updated ${course.courseName}`);
	res.redirect(`/view/${course._id}/edit`)
}

exports.deleteCourse = async (req, res) => {
	await Course.deleteOne({ _id: req.params.id})
	req.flash('success', 'Successfully deleted course');
	res.redirect('/view');
}