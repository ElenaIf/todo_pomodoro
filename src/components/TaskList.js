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
	loading,
	chosenProject,
}) => {
	const filterProjects = (project) => {
		todosArray
			.filter((todo) => {
				return todo.hashtag.toLowerCase().indexOf(project.toLowerCase()) >= 0;
			})
			.map((todo) => {
				return console.log(todo.title);
			});
	};

	return (
		<div className="tasks-area">
			<div className="tasks">
				{loading === true && !todosArray && (
					<Spinner className="spinner" animation="border" variant="warning" />
				)}
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
						/>
					))}
			</div>
		</div>
	);
};

export default TaskList;
