import React from "react";

import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

import TodoApp from "./ToDoApp";
import About from "./About";
import Signup from "../components/Signup/Signup";
import Login from "../components/Signup/Login";
import PageForLogOut from "../components/Signup/PageForLogOut";
import ForgotPassword from "../components/Signup/ForgotPassword";
import UpdateProfile from "../components/Signup/UpdateProfile";
import ToDoAppUnregistered from "./ToDoAppUnregistered";

import { useAuth } from "../contexts/AuthContext";

import "../style/css/Main.css";

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
	todosArrayUnregistered,
	setTodosArrayUnregistered,
	toggleTodoUnregistered,
	addTodoUnregistered,
	updateTodoUnregistered,
	saveTimeIntoTodoUnregistered,
	deleteTodoUnregistered,
}) => {
	const { currentUser } = useAuth();
	return (
		<main>
			<Switch>
				{currentUser ? (
					<Route exact path="/">
						<TodoApp
							todosArray={todosArray}
							setTodosArray={setTodosArray}
							toggleTodo={toggleTodo}
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
					</Route>
				) : (
					<Route exact path="/">
						<ToDoAppUnregistered
							todosArray={todosArrayUnregistered}
							setTodosArray={setTodosArrayUnregistered}
							toggleTodo={toggleTodoUnregistered}
							addTodo={addTodoUnregistered}
							updateTodo={updateTodoUnregistered}
							deleteTodo={deleteTodoUnregistered}
							setshowSecondTimer={setshowSecondTimer}
							setIsRunning={setIsRunning}
							timer={timer}
							setRenderReadyTimer={setRenderReadyTimer}
							setSelectedTodo={setSelectedTodo}
							setSeconds={setSeconds}
						/>
					</Route>
				)}

				<PrivateRoute path="/update-profile" component={UpdateProfile} />
				<PrivateRoute path="/profile" component={PageForLogOut} />
				<Route path="/about" component={About} />
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/forgot-password" component={ForgotPassword} />
			</Switch>
		</main>
	);
};

export default Main;
