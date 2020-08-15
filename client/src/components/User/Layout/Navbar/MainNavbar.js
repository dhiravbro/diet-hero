import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../../../redux';
import './Navbar.css';
const StudentNavbar = (props) => {
	
	// const [ dropdown, setDropdown ] = useState(false);
	// const toggleDropdown = () => {
	// 	setDropdown(!dropdown);
	// };
	return (
		<div className="main-navbar">
			<span className="navbar-brand">Diet Hero</span>
			<div className="navbar-options-div"><span className = "navbar-options">Home</span>
			<span className = "navbar-options">About</span>
			<span className = "navbar-options">Contact Us</span>
			</div>
			
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: function() {
			dispatch(logoutUser());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentNavbar);
