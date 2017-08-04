const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Please enter course name'
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Course', courseSchema);