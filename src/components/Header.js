import React from "react";

import "../style/css/header.css";

const Header = () => {
	return (
		<header>
			<p>Header here</p>
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
			</ul>
		</header>
	);
};

export default Header;
