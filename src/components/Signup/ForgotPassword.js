import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
	const emailRef = useRef();

	const { resetPassword } = useAuth();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your email for further instructions");
		} catch {
			setError("Failed to reset password");
		}
		setLoading(false);
	}

	return (
		<Container className="d-flex flex-column align-items-center justify-content-center">
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Reset Password</h2>

					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">
							Reset password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/login">No, I know my password, back to Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't have an account? <Link to="signup">Sign Up</Link>
			</div>
		</Container>
	);
};

export default ForgotPassword;
