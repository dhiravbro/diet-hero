import setAuthenticationToken from './setAuthenticationToken';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {
	SIGNUP_USER,
	LOGIN_USER,
	USER_MSG,
	SET_CURRENT_USER,
	LOGOUT_USER,
	SHOW_PROFILE,
	UPDATE_PROFILE,
	CHANGE_PASS,
	GET_EXAM,
	GET_RECIPE,
	DASHBOARD_CARD,
	ATTEMPTED_EXAM,
	EXAM_ANALYSIS,
	ADD_POST,
	ALL_POST,
	DELETE_POST,
	DELETE_COMMENT,
	ADD_COMMENT,
	EXAM_SUBMIT
} from './userType';

export const signupUser = (username, email, password, confirmPassword) => {
	return function(dispatch) {
		var OPTIONS = {
			url: '/signup',
			method: 'POST',
			data: {
				username: username,
				email: email,
				password: password,
				confirmpassword: confirmPassword
			},

			headers: {
				'content-type': 'application/json'
			}
		};

		axios(OPTIONS)
			.then((res) => {
				const message = res.data.message;
				dispatch({
					type: SIGNUP_USER,
					payload: message
				});
			})
			.catch((err) => console.log(err));
	};
};

export const loginUser = (username, password) => {
	return function(dispatch) {
		var OPTIONS = {
			url: '/login',
			method: 'POST',
			data: {
				username: username,
				password: password
			},
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(OPTIONS)
			.then((res) => {
				const message = res.data.message;

				if (message === 'User Found') {
					const token = res.data.token;
					localStorage.setItem('jwtToken', token);
					setAuthenticationToken(token);

					dispatch(setCurrentUser(jwt.decode(token)));
					dispatch(showUser(jwt.decode(token).userid));
					dispatch({
						type: LOGIN_USER,
						payload: message,
						isLoggedIn: true
					});
				} else {
					dispatch({
						type: LOGIN_USER,
						payload: message,
						isLoggedIn: false
					});
				}
			})
			.catch((err) => console.log(err));
	};
};

export const setCurrentUser = (user) => {
	return function(dispatch) {
		dispatch(showUser(user.userid));

		dispatch({
			type: SET_CURRENT_USER,
			payload: user
		});
	};
};

export const logoutUser = () => {
	return function(dispatch) {
		localStorage.removeItem('jwtToken');
		setAuthenticationToken(false);
		dispatch(setCurrentUser({}));

		dispatch({
			type: LOGOUT_USER
		});
		window.location.href = '/';
	};
};
export const changePassword = (username, oldpassword, newpassword) => {
	return function(dispatch) {
		var config = {
			method: 'post',
			data: {
				username,
				oldpassword,
				newpassword,
				type: 'student'
			},
			url: '/changepassword',
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then((res) => {
				dispatch({
					type: USER_MSG,
					payload: res.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const showUser = (userid) => {
	console.log(userid);
	return function(dispatch) {
		var config = {
			method: 'get',
			url: '/userprofile/' + userid,
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then((res) => {
				const profile = res.data;

				dispatch({
					type: SHOW_PROFILE,
					payload: profile
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const updateUser = (activityLevel,goal,approach,gender,age,height,heightunits,weight,weightunits,profileid) => {
	return function(dispatch) {
		var config = {
			method: 'patch',
			data: {
				activityLevel,
				goal,
				approach,
				gender,
				age,
				height,
				heightunits,
				weight,
				weightunits,
				profileid
			},
			url: '/updateprofile',
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then((res) => {
				const profile = res.data;

				dispatch({
					type: UPDATE_PROFILE,
					payload: profile
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};

export const showexam = (coaching, course) => {
	return function(dispatch) {
		var config = {
			method: 'post',
			url: '/exampapers',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				coaching: coaching,
				course: course
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: GET_EXAM,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const caloriesRecipes = (minCalories,maxCalories,number) => {
	console.log(minCalories,maxCalories,number);
	return function(dispatch) {
		var config = {
			method: 'GET',
			url: 'getrecipe/'+minCalories+'/'+maxCalories+'/'+number+'',
			
			headers: {
				'content-type': 'application/json',
			  }
		};
		axios(config)
			.then(function(response) {
				console.log(response);
				dispatch({
					type: GET_RECIPE,
					payload:response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const attemptquestion = (examid, userid, subject, secid, questionid, mark) => {
	return function(dispatch) {
		var config = {
			method: 'put',
			url: '/attemptquestion',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				examid: examid,
				userid: userid,
				subject: subject,
				secid: secid,
				questionid,
				mark: mark
			}
		};

		axios(config).then(function(response) {}).catch(function(error) {
			console.log(error);
		});
	};
};
export const dashboard = (userid) => {
	return function(dispatch) {
		var config = {
			method: 'get',
			url: '/dashboard/' + userid,
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: DASHBOARD_CARD,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const calculation = (examid, userid) => {
	return function(dispatch) {
		var config = {
			method: 'get',
			url: '/calculation/' + examid + '/' + userid,
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: EXAM_SUBMIT,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const attemptedExam = (userid) => {
	return function(dispatch) {
		var config = {
			method: 'get',
			url: '/attemptedexam/' + '/' + userid,
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: ATTEMPTED_EXAM,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const examAnalysis = (userid, examid) => {
	return function(dispatch) {
		console.log('heelo useraction');
		var config = {
			method: 'get',
			url: '/analysisexam/' + examid + '/' + userid,
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: EXAM_ANALYSIS,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const addPost = (userid, avatar, query, queryimage, subject, tags, username) => {
	return function(dispatch) {
		const formData = new FormData();
		formData.append('queryimage', queryimage);
		formData.append('userid', userid);
		formData.append('avatar', avatar);
		formData.append('query', query);
		formData.append('subject', subject);
		formData.append('Tags', JSON.stringify(tags));

		formData.append('username', username);
		var config = {
			method: 'post',
			url: '/addpost',
			headers: {
				'content-type': 'application/json'
			},
			processData: false,
			data: formData
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: ADD_POST,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const deletePost = (postid) => {
	return function(dispatch) {
		var config = {
			method: 'post',
			url: '/deletepost',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				postid
			}
		};

		axios(config)
			.then(function(response) {
				console.log(response.data);
				dispatch({
					type: DELETE_POST,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const deleteComment = (postid, commentid) => {
	return function(dispatch) {
		console.log(postid, commentid);
		var config = {
			method: 'post',
			url: '/deletecomment',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				postid,
				commentid
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: DELETE_COMMENT,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const allPost = () => {
	return function(dispatch) {
		var config = {
			method: 'get',
			url: '/allpost',
			headers: {
				'content-type': 'application/json'
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: ALL_POST,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
export const addComment = (postid, avatar, username, comment, upvote) => {
	return function(dispatch) {
		var config = {
			method: 'post',
			url: '/addcomment',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				postid,
				avatar,
				username,
				comment,
				upvote
			}
		};

		axios(config)
			.then(function(response) {
				dispatch({
					type: ADD_COMMENT,
					payload: response.data
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};
};
