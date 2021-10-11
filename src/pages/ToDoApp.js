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
	setshowSecondTimer,
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
				setshowSecondTimer={setshowSecondTimer}
			/>
			<PieChart todosArray={todosArray} setTodosArray={setTodosArray} />
		</div>
	);
};

export default TodoApp;
