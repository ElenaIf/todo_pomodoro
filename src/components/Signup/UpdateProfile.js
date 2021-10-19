import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../../style/css/Login.css";

const UpdateProfile = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passworConfirmdRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passworConfirmdRef.current.value) {
			return setError("Passwords do not match");
		}

		const promises = [];

		setLoading(true);
		setError("");

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push("/todo/");
			})
			.catch(() => {
				setError("Failed to update account");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<Container className="d-flex flex-column align-items-center justify-content-center">
			<Card className="login-card">
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email" className="mb-2">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password (leave blank to keep the password)</Form.Label>
							<Form.Control type="password" ref={passwordRef} />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Confirm your password</Form.Label>
							<Form.Control type="password" ref={passworConfirmdRef} />
						</Form.Group>
						<Button disabled={loading} className="w-100 mt-3 login-button" type="submit">
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/todo/">Cancel</Link>
			</div>
		</Container>
	);
};

export default UpdateProfile;
