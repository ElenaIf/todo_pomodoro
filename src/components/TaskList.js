import React from "react";

import Task from "./Task";

import "../style/css/TaskList.css";

import Spinner from "react-bootstrap/Spinner";

const TaskList = ({
	setTodosArray,
	todosArray,
	toggleTodo,
	updateTodo,
	deleteTodo,
	setshowSecondTimer,
	setIsRunning,
	timer,
	setRenderReadyTimer,
	setSelectedTodo,
	setSeconds,
	downloadingTasks,
	chosenProject,
	deleteProject,
}) => {
	return (
		<div className="tasks-area">
			{downloadingTasks === true && (
				<Spinner className="spinner" animation="border" variant="light" />
			)}
			<div className="tasks">
				{todosArray
					.filter((todo) => {
						if (
							todo.hashtag !== null &&
							chosenProject !== null &&
							todo.hashtag !== undefined &&
							chosenProject !== undefined
						) {
							return todo.hashtag.indexOf(chosenProject) >= 0;
						}
						return todosArray;
					})
					.map((todo) => (
						<Task
							key={todo.id}
							todo={todo}
							toggleTodo={toggleTodo}
							updateTodo={updateTodo}
							deleteTodo={deleteTodo}
							todosArray={todosArray}
							setTodosArray={setTodosArray}
							setshowSecondTimer={setshowSecondTimer}
							setIsRunning={setIsRunning}
							timer={timer}
							setRenderReadyTimer={setRenderReadyTimer}
							setSelectedTodo={setSelectedTodo}
							setSeconds={setSeconds}
							deleteProject={deleteProject}
						/>
					))}
			</div>
		</div>
	);
};

export default TaskList;
