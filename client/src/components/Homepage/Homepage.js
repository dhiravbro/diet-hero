import React, { useState } from 'react';
import './Homepage.css';
import Login from '../Login';
import { Link } from 'react-router-dom';
import MainNavbar from '../User/Layout/Navbar/MainNavbar';
import HeroImage from '../../assets/images/MainImage.jpg'
function Homepage() {


	return (
		<div>
				<MainNavbar/>
	<img className="Hero-img" src={HeroImage} />
				<Login />
	
			<section id="footer">
				<div className="container-fluid d-flex justify-content-center p-5">
					<a className="m-5 text-white footer-link" href="https://www.facebook.com">
						Facebook
					</a>
					<a className="m-5 text-white footer-link" href="linkedin.com">
						LinkedIn
					</a>
					<a className="m-5 text-white footer-link" href="Instagram.com">
						Instagram
					</a>
				</div>
			</section>
		</div>
	);
}

export default Homepage;
