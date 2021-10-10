import React from "react";

import AddTaskBar from "../components/AddTaskBar";
import TaskList from "../components/TaskList";
import PieChart from "../components/PieChart";

import "../style/css/ToDoApp.css";

const TodoApp = ({
	setTodosArray,
	todosArray,
	toggleTodo,
	addTodo,
	updateTodo,
	deleteTodo,
	saveTimeIntoTodo,
}) => {
	return (
		<div className="container-todo-app">
			<AddTaskBar addTodo={addTodo} />
			<TaskList
				todosArray={todosArray}
				toggleTodo={toggleTodo}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				setTodosArray={setTodosArray}
				saveTimeIntoTodo={saveTimeIntoTodo}
			/>
			<PieChart />
		</div>
	);
};

export default TodoApp;
