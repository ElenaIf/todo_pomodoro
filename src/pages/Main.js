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
	saveTimeIntoTodo,
	setshowSecondTimer,
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
						saveTimeIntoTodo={saveTimeIntoTodo}
						setshowSecondTimer={setshowSecondTimer}
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
