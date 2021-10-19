import React, { useState } from "react";

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
	loading,
}) => {
	const [chosenProject, setChosenProject] = useState(null);
	return (
		<div className="container-todo-app">
			<AddTaskBar
				addTodo={addTodo}
				todosArray={todosArray}
				setTodosArray={setTodosArray}
				setChosenProject={setChosenProject}
			/>
			<TaskList
				loading={loading}
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
				chosenProject={chosenProject}
			/>
			<PieChart todosArray={todosArray} setTodosArray={setTodosArray} />
		</div>
	);
};

export default TodoApp;
