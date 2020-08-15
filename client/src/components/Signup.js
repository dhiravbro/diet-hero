import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signupUser } from '../redux';
import './Signup.css';

function Signup(props) {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	return (
		<div className="signup-div">
					<h1 className="signup-title">Signup</h1>
						<p>{props.msg}</p>
						<div className="input-div">
							<span>Username : </span>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="input-div">
							<span>Email</span>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="input-div">
							<span>Password</span>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="input-div">

					<span>Confirm Password</span>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
					</div>
						<div className="signup-to-login">
							Already have an account?<a href="/">Login Here</a>
						</div>
						<button
						className="signup-button"
							variant="primary"
							onClick={() => props.signupUser(username, email, password, confirmPassword)}
						>
							Signup
						</button>
			</div>
	);
}

const mapStatetoProps = (state) => {
	return {
		username: state.user.username,
		email: state.user.email,
		password: state.user.password,
		confirmPassword: state.user.confirmPassword,
		msg: state.user.msg
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		signupUser: function(username, email, password, confirmPassword) {
			dispatch(signupUser(username, email, password, confirmPassword));
		}
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Signup);
