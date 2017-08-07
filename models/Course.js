const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
	courseName: {
		type: String,
		required: 'Please enter course name'
	},
	time: {
		type: Number,
		required: "You must select time",
		unique: true
	},
	days: [String],
	date: {
		type: Date,
		default: Date.now
	}
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
