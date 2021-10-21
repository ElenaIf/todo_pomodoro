import React, { useState } from "react";

import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../style/css/Header.css";

import logo from "../assets/images/LenaLogo.png";

const Header = () => {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	let links = document.querySelectorAll("nav ul li a");
	let navigation = document.querySelector("nav");
	let header = document.querySelector("header");

	async function handleLogout() {
		setError("");
		try {
			await logout();
			history.push("/todo/");
		} catch {
			setError("Failed to logout");
		}
	}

	return (
		<header>
			<nav className={open ? "responsive" : ""}>
				<button
					className="hidden-button"
					id="mobileButton"
					onClick={() => {
						setOpen(!open);
					}}
				>
					<span className="material-icons">menu</span>
				</button>

				<ul>
					<li>
						<NavLink
							onClick={() => {
								setOpen(false);
							}}
							to="/todo/"
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							onClick={() => {
								setOpen(false);
							}}
							to="/todo/about"
						>
							About
						</NavLink>
					</li>
					{currentUser ? (
						<li
							onClick={() => {
								setOpen(false);
							}}
						>
							<button onClick={handleLogout}>Logout</button>
						</li>
					) : (
						<li>
							<NavLink
								onClick={() => {
									setOpen(false);
								}}
								to="/todo/login"
							>
								Log in
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
			{currentUser && (
				<ul>
					<li>
						User:{" "}
						<Link to="/todo/profile" style={{ textDecoration: "underline" }}>
							{currentUser.email}
						</Link>
					</li>
				</ul>
			)}
			<Link to="/todo/">
				<img src={logo} alt="Elena Ivankina logo" id="logo" />
			</Link>
		</header>
	);
};

export default Header;
