import React, { useState } from "react";

import "../style/css/Task.css";

const Task = ({
	todo,
	toggleTodo,
	updateTodo,
	deleteTodo,
	setshowSecondTimer,
	setIsRunning,
	timer,
	setRenderReadyTimer,
	setSelectedTodo,
	setSeconds,
	deleteProject,
}) => {
	const [edit, setEdit] = useState(null);
	const [newTodoText, setNewTodoText] = useState(todo.title);

	if (edit) {
		return (
			<form
				className="edit-form"
				onSubmit={(event) => {
					event.preventDefault();
					if (newTodoText !== "") {
						updateTodo(edit, newTodoText);
					} else {
						deleteTodo(todo);
					}

					setEdit(null);
				}}
			>
				<input
					name="todo"
					value={newTodoText}
					onChange={(event) => {
						event.persist();
						setNewTodoText(event.target.value);
					}}
				/>
				<button type="submit">Save</button>
			</form>
		);
	}

	let watchHours = Math.floor(todo.timeSpent / 3600)
		.toString()
		.padStart(2, "0");

	let watchMinutes = Math.floor((todo.timeSpent - Math.floor(todo.timeSpent / 3600) * 3600) / 60)
		.toString()
		.padStart(2, "0");

	let watchSeconds = (todo.timeSpent - Math.floor(todo.timeSpent / 60) * 60)
		.toString()
		.padStart(2, "0");

	return (
		<div className="single-task-area">
			<div className="todo">
				{/* <div className="todo-bullet"></div> */}
				<div className="todo-text">
					<span
						onClick={() => {
							toggleTodo(todo);
						}}
						style={{ textDecoration: todo.done ? "line-through" : undefined }}
					>
						{todo.title}{" "}
					</span>
					<i
						className="fa fa-pencil"
						aria-hidden="true"
						onClick={() => {
							setEdit(todo);
						}}
					></i>
					<i
						className="fa fa-times"
						aria-hidden="true"
						onClick={() => {
							deleteTodo(todo);
						}}
					></i>
				</div>
				{/* 		<div className="hashtags">
					{todo.hashtags.map((tag) => {
						return <div key={Math.random()}>{tag} </div>;
					})}
				</div> */}
			</div>
			<div className="total-time">
				<div className="time-spent-text">
					Total time spent: {`${watchHours}:${watchMinutes}:${watchSeconds}`}{" "}
					<button
						className="timer-button"
						onClick={() => {
							setshowSecondTimer(true);
							setIsRunning(true);
							setSeconds(timer);
							setRenderReadyTimer(false);
							setSelectedTodo(todo);
						}}
					>
						Start Pomodoro timer (25 min)
					</button>
				</div>
				{todo.hashtag && (
					<div className="project">
						<span className="project-text">{todo.hashtag}</span>
						{todo.hashtag !== "No Project" && (
							<i
								className="fa fa-times"
								aria-hidden="true"
								onClick={() => {
									deleteProject(todo);
								}}
							></i>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Task;
