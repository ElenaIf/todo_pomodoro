import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const PageForLogOut = () => {
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
		<div className="w-100 d-flex align-items-center  flex-column">
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong>Email: </strong>
					{currentUser.email}
					<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
						Update profile
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log out
				</Button>
			</div>
		</div>
	);
};

export default PageForLogOut;
