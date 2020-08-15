import React from 'react';
import { Provider } from 'react-redux';
import setAuthenticationToken from './components/setAuthenticationToken.js';
import { setCurrentUser, logoutUser} from './redux';
import jwt from 'jsonwebtoken';
import store from './redux/store';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DietMeter from './components/DietMeter.js';

if (localStorage.jwtToken) {
	setAuthenticationToken(localStorage.jwtToken);
	jwt.verify(localStorage.jwtToken, 'secret', function(err, decode) {
		if (err) {
			store.dispatch(logoutUser());
		} else {
			store.dispatch(setCurrentUser(decode));
		}
	});
}
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<DietMeter />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
