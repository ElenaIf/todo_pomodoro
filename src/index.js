import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Style
import "./style/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Authentication
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
	<AuthProvider>
		<App />
	</AuthProvider>,
	document.getElementById("root")
);
