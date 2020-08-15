import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Sidebar.css';
import { logoutUser, allPost } from '../../../../redux';
function Sidebar(props) {
	

	const activeStyle = {
		color: '#3333ff',
		backgroundColor: 'white',
		borderTopLeftRadius: '15px',
		borderBottomLeftRadius: '15px'
	};
	

	return (
		<div className="Sidebar">
			<span className="sidebar-brand">examigo</span>
			<div className="user-sidebar-info">
				<img
					className="sidebar-avatar"
					src={'http://localhost:5000/static/Avatars/72ppi/avatar' + props.profile.avatar + '.png'}
					alt="avatar"
				/>
				<div className="user-greeting">
					<span className="user">Hi {props.userDetails.username} !</span>
					<span className="greeting">What's Your Goal for Today?</span>
				</div>
			</div>

			<div className="sidebar-options-list">
				<NavLink className="sidebar-options" activeStyle={activeStyle} to="/dashboard">
					Dashboard
				</NavLink>

				<NavLink className="sidebar-options" activeStyle={activeStyle} to="/upcoming">
					Tests
				</NavLink>

				<NavLink className="sidebar-options" to="/chat-room" activeStyle={activeStyle}>
					Chat room
				</NavLink>

				<NavLink
					className="sidebar-options"
					activeStyle={activeStyle}
					to="/discussion-forum"
					onClick={() => props.allPost()}
				>
					Discussion Forum
				</NavLink>

				<NavLink className="sidebar-options" activeStyle={activeStyle} to="/feedback">
					Feedback
				</NavLink>

				<span className="copyright">© CopyRight of Examigo {new Date().getFullYear()}</span>
			</div>
		</div>
	);
}
const mapStatetoProps = (state) => {
	return {
		userDetails: state.user.userDetails,
		profile: state.user.profile
	};
};
const mapDispatchtoProps = (dispatch) => {
	return {
		logoutUser: function() {
			dispatch(logoutUser());
		},
		allPost: function() {
			dispatch(allPost());
		}
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Sidebar);
