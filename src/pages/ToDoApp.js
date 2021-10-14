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
	setshowSecondTimer,
	setIsRunning,
	timer,
	setRenderReadyTimer,
	setSelectedTodo,
	setSeconds,
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
				setshowSecondTimer={setshowSecondTimer}
				setIsRunning={setIsRunning}
				timer={timer}
				setRenderReadyTimer={setRenderReadyTimer}
				setSelectedTodo={setSelectedTodo}
				setSeconds={setSeconds}
			/>
			<PieChart todosArray={todosArray} setTodosArray={setTodosArray} />
		</div>
	);
};

export default TodoApp;
