const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', courseController.getHome);

router.get('/add', authController.isLoggedIn, courseController.addCourse);
router.post('/add', catchErrors(courseController.saveCourse));

router.get('/view', catchErrors(courseController.viewCourse));

router.get('/register', userController.registerForm);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.post('/register', 
	userController.validateRegister,
	userController.register,
	authController.login);

router.get('/logout', authController.logout);


module.exports = router;
