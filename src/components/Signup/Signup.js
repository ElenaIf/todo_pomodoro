import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../style/css/Login.css";

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passworConfirmdRef = useRef();
	const { signup } = useAuth();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passworConfirmdRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/todo/");
		} catch {
			setError("There was a problem creating an account");
		}
		setLoading(false);
	}

	return (
		<Container className="d-flex flex-column align-items-center justify-content-center">
			<Card className="login-card">
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>

					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email" className="mb-2">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password" className="mb-2">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group id="password-confirm" className="mb-2">
							<Form.Label>Confirm your password</Form.Label>
							<Form.Control type="password" ref={passworConfirmdRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100 mt-2 login-button" type="submit">
							Sign up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/todo/login">Log In</Link>
			</div>
		</Container>
	);
};

export default Signup;
