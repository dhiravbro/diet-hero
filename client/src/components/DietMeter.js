import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Homepage from './Homepage/Homepage';
import UserLayout from './User/Layout/Layout';
import UserProfile from './User/UserProfile';


function DietMeter() {
	let callContainer;
	const isUserLoggedin = useSelector((state) => state.user.isLoggedIn);
	const type = useSelector((state) => state.user.type);

		if (isUserLoggedin === false) {
			callContainer = <>
			<Route path="/" component={Homepage} />
			<Route path="/userprofile" component={UserProfile} />
			</>;
		} else {
			callContainer = <Route path="/" component={UserLayout} />;
		}



	return (
		<Router>
			<Switch>
				<Route path="/signup" component={Signup} />
				{callContainer}
			</Switch>
		</Router>
	);
}

export default DietMeter;
