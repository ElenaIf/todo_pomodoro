import React, { useState } from "react";

import AddTaskBar from "../components/AddTaskBar";
import TaskList from "../components/TaskList";
import PieChart from "../components/PieChart";
import PieChartForProject from "../components/PieChartForProject";

import "../style/css/ToDoApp.css";
import "../style/css/PieChart.css";

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
	downloadingTasks,
	deleteProject,
}) => {
	const [chosenProject, setChosenProject] = useState(null);

	let projectArray = [];

	if (todosArray !== undefined) {
		todosArray.forEach((element) => {
			if (element.hashtag !== null) {
				projectArray.push(element.hashtag);
			}
			projectArray = Array.from(new Set(projectArray));
			return projectArray;
		});
	}
	return (
		<div className="container-todo-app">
			<AddTaskBar
				addTodo={addTodo}
				todosArray={todosArray}
				setTodosArray={setTodosArray}
				setChosenProject={setChosenProject}
				projectArray={projectArray}
				chosenProject={chosenProject}
			/>
			<TaskList
				downloadingTasks={downloadingTasks}
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
				deleteProject={deleteProject}
			/>
			<div className="pie-area">
				<div className="individual-pie">
					<PieChart todosArray={todosArray} />
				</div>
				<div className="individual-pie">
					<PieChartForProject todosArray={todosArray} projectArray={projectArray} />
				</div>
			</div>
		</div>
	);
};

export default TodoApp;
