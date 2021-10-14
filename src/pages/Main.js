import React from "react";

import { Switch, Route } from "react-router-dom";

import TodoApp from "./ToDoApp";
import About from "./About";

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
}) => {
	return (
		<main>
			<Switch>
				<Route exact path="/">
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
				</Route>
				<Route path="/about">
					<About />
				</Route>
			</Switch>
		</main>
	);
};

export default Main;
