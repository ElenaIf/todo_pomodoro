import React from "react";

import { Switch, Route } from "react-router-dom";

import TodoApp from "./ToDoApp";
import About from "./About";
import Signup from "../components/Signup/Signup";
import Login from "../components/Signup/Login";
import PageForLogOut from "../components/Signup/PageForLogOut";
import ForgotPassword from "../components/Signup/ForgotPassword";

import PrivateRoute from "../components/PrivateRoute";

import "../style/css/Main.css";
import UpdateProfile from "../components/Signup/UpdateProfile";

const Main = ({
	setTodosArray,
	todosArray,
	toggleTodo,
	addTodo,
	updateTodo,
	deleteTodo,
	setshowSecondTimer,
	setIsRunning,
	timer,
	setRenderReadyTimer,
	setSelectedTodo,
	setSeconds,
}) => {
	return (
		<main>
			<Switch>
				<PrivateRoute exact path="/">
					<TodoApp
						todosArray={todosArray}
						toggleTodo={toggleTodo}
						setTodosArray={setTodosArray}
						addTodo={addTodo}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
						setshowSecondTimer={setshowSecondTimer}
						setIsRunning={setIsRunning}
						timer={timer}
						setRenderReadyTimer={setRenderReadyTimer}
						setSelectedTodo={setSelectedTodo}
						setSeconds={setSeconds}
					/>
				</PrivateRoute>
				<PrivateRoute path="/update-profile" component={UpdateProfile} />
				<Route path="/about" component={About} />
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/profile" component={PageForLogOut} />
				<Route path="/forgot-password" component={ForgotPassword} />
			</Switch>
		</main>
	);
};

export default Main;
