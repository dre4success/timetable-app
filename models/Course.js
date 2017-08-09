const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
	courseName: {
		type: String,
		required: 'Please enter course name'
	},
	daytime: [{
		time: {
			type: String,
			required: "You must enter a time"
		},
		day: {
			type: String,
			required: "You must enter a day"
		}
	}]	
})

courseSchema.statics.getCourse = function() {
	return this.aggregate([
		{ $unwind: '$days'},
		{ $group: {_id: '$days', count: { $sum: 1} }}

	]) 
}
/*courseSchema.statics.getCourseByTime = function() {
	return this.aggregate([
			{ $group: {_id: '$time'}}
	])
}*/


module.exports = mongoose.model('Course', courseSchema);
