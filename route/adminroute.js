var express = require('express');
var routers = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// var checkAuth=require('./middleware/auth');
var AdminModel = require('../models/adminmodel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
routers.use(express.json());
routers.use(bodyParser.urlencoded({ extended: true }));

route.post('/login', function(req, res) {
	var username = req.body.username;
	AdminModel.find({ username: username })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				res.status(404).json({
					message: 'Auth Failed'
				});
			} else {
				bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if (err) {
						res.json({
							message: 'Auth Failed'
						});
					}
					if (result) {
						var token = jwt.sign(
							{
								username: user[0].username,
								userid: user[0]._id
							},
							'secret',
							{
								expiresIn: '8h'
							}
						);
						res.status(200).json({
							message: 'User Found',
							token: token
						});
					} else {
						res.json({
							message: 'Auth Failed'
						});
					}
				});
			}
		})
		.catch((err) => {
			res.json({
				error: err
			});
		});
});

route.post('/signup', function(req, res) {
	console.log(req.body);
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var confirmPassword = req.body.confirmpassword;

	if (password !== confirmPassword) {
		res.json({
			message: 'Password Not Matched!'
		});
	} else {
		bcrypt.hash(password, 10, function(err, hash) {
			if (err) {
				return res.json({
					message: 'Something Wrong, Try Later!',
					error: err
				});
			} else {
				var userDetails = new AdminModel({
					username: username,
					email: email,
					password: hash
				});

				userDetails
					.save()
					.then((doc) => {
						res.status(201).json({
							message: 'User Registered Successfully',
							results: doc
						});
					})
					.catch((err) => {
						res.json(err);
					});
			}
		});
	}
});

module.exports = route;
