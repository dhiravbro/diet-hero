import {
	SIGNUP_USER,
	LOGIN_USER,
	SET_CURRENT_USER,
	LOGOUT_USER,
	USER_MSG,
	SHOW_PROFILE,
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
	UPDATE_PROFILE,
	EXAM_SUBMIT
} from '../action/userType';
const initialState = {
	isLoggedIn: false,
	username: '',
	email: '',
	profileImage: '',
	user_id: '',
	password: '',
	confirmPassword: '',
	action: 'Signup',
	msg: '',
	passmsg: '',
	calrecipe:'',
	userDetails: {},
	type: 'Student',
	profile: {},
	exam: [],
	loading: true,
	examloading: true,
	attemptloading: true,
	dashboard: {},
	dashboardloading: true,
	attemptedexam: [],
	attemptedexamloading: true,
	examanalysis: {},
	analysisloading: true,
	postmsg: '',
	allpost: [],
	postsloading: true
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP_USER:
			return {
				...state,
				msg: action.payload
			};

		case LOGIN_USER:
			return {
				...state,
				msg: action.payload,
				isLoggedIn: action.isLoggedIn
			};

		case SET_CURRENT_USER:
			return {
				...state,
				userDetails: action.payload,
				isLoggedIn: true
			};

		case LOGOUT_USER:
			return {
				...state,
				isLoggedIn: false
			};
		case USER_MSG:
			return {
				...state,
				passmsg: action.payload
			};

		case SHOW_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case UPDATE_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false
			};

		case GET_EXAM:
			return {
				...state,
				exam: action.payload,
				examloading: false
			};
		case GET_RECIPE:
			return {
				...state,
				calrecipe: action.payload,
				attemptloading: false
			};
		case DASHBOARD_CARD:
			return {
				...state,
				dashboard: action.payload,
				dashboardloading: false
			};
		case ATTEMPTED_EXAM:
			return {
				...state,
				attemptedexam: action.payload,
				attemptedexamloading: false
			};
		case EXAM_SUBMIT:
			return {
				...state,

				submitmsg: action.payload,
				attemptedexamloading: true
			};
		case EXAM_ANALYSIS:
			return {
				...state,
				examanalysis: action.payload,
				analysisloading: false
			};
		case ADD_POST:
			return {
				...state,
				allpost: [ action.payload, ...state.allpost ]
			};
		case ADD_COMMENT:
			return {
				...state,
				allpost: state.allpost.map((post) => {
					if (post._id === action.payload.postid) {
						if (action.payload.commentdetail) {
							return {
								...post,
								comment: [ ...post.comment, { ...action.payload.commentdetail, _id: Date.now } ]
							};
						} else {
							return { ...post, upvote: action.payload.postupvote };
						}
					} else return post;
				})
			};
		case DELETE_COMMENT:
			console.log(action.payload);
			return {
				...state,
				allpost: state.allpost.map((post) => {
					if (post._id === action.payload.postid) {
						return {
							...post,
							comment: post.comment.filter((comment) => {
								console.log(comment._id);
								return comment._id !== action.payload.commentid;
							})
						};
					} else return post;
				})
			};

		case DELETE_POST:
			return {
				...state,
				allpost: state.allpost.filter((post) => {
					return post._id !== action.payload;
				})
			};
		case ALL_POST:
			return {
				...state,
				allpost: action.payload,
				postsloading: false
			};

		default:
			return state;
	}
};

export default userReducer;
