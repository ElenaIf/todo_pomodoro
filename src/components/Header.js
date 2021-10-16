import React from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../style/css/Header.css";

const Header = () => {
	const { signup, currentUser } = useAuth();
	return (
		<header>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
				<li>
					<NavLink to="/signup">Sign up</NavLink>
				</li>
				{/* <li>{currentUser.email}</li>
				<li>{currentUser.uid}</li> */}
			</ul>
		</header>
	);
};

export default Header;
