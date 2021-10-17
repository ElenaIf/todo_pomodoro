import React, { useState } from "react";

import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../style/css/Header.css";

const Header = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	async function handleLogout() {
		setError("");
		try {
			await logout();
			history.push("/");
		} catch {
			setError("Failed to logout");
		}
	}

	return (
		<header>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/about">About</NavLink>
					</li>
					{currentUser ? (
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					) : (
						<li>
							<NavLink to="/login">Log in</NavLink>
						</li>
					)}
				</ul>
			</nav>
			{currentUser && (
				<ul>
					<li>
						User:{" "}
						<Link to="/profile" style={{ textDecoration: "underline" }}>
							{currentUser.email}
						</Link>
					</li>
				</ul>
			)}
		</header>
	);
};

export default Header;
