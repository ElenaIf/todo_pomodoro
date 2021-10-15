import React from "react";

import { NavLink } from "react-router-dom";

import "../style/css/Header.css";

const Header = () => {
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
			</ul>
		</header>
	);
};

export default Header;
