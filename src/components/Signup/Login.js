import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../../style/css/Login.css";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/todo/");
		} catch {
			setError("Failed to sign in");
		}
		setLoading(false);
	}

	return (
		<Container className="d-flex flex-column align-items-center justify-content-center">
			<Card className="login-card">
				<Card.Body>
					<h2 className="text-center mb-4">Log in</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email" className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100 mt-4 login-button" type="submit">
							Log in
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/todo/forgot-password">Forgot Password</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't have an account? <Link to="/todo/signup">Sign Up</Link>
			</div>
		</Container>
	);
};

export default Login;
