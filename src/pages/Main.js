import React from "react";

import { Switch, Route } from "react-router-dom";

import TodoApp from "./ToDoApp";
import About from "./About";

const Main = ({
	setTodosArray,
	todosArray,
	toggleTodo,
	addTodo,
	updateTodo,
	deleteTodo,
	saveTimeIntoTodo,
}) => {
	return (
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
				/>
			</Route>
			<Route path="/about">
				<About />
			</Route>
		</Switch>
	);
};

export default Main;
