import React, { useState } from 'react';
import { Modal , ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser} from '../redux/index';
import {Link} from 'react-router-dom';
import './Login.css';

const Login = (props) => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ activeTab, setActiveTab ] = useState('1');

	const toggletab = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div className="login-div">
		
			
		<h1 className="login-title">Login</h1>
												
												<span>{props.msg}</span>
												<div className="input-div">
													<span>Username : </span>
													<input
														type="text"
														defaultValue={props.username}
														onChange={(e) => setUsername(e.target.value)}
													/>
										</div>
										<div className="input-div">
													<span>Password : </span>
													<input
														type="password"
														defaultValue={props.password}
														onChange={(e) => setPassword(e.target.value)}
													/>
											</div>
											<button
											className ="login-button"
												variant="primary"
												onClick={() => props.loginUser(username, password)}
											>
											Login
											</button>
											<Link to='/signup' className="login-to-signup">Don't have an account? Sign Up</Link>

										
		</div>
	);
};
const mapStatetoProps = (state) => {
	return {
		username: state.user.username,
		password: state.user.password,
		msg: state.user.msg,
	};
};

const mapDispatchtoProps = (dispatch) => {
	return {
		loginUser: function(username, password) {
			dispatch(loginUser(username, password));
		},
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
