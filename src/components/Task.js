import React, { useState } from "react";

// import UpdateTaskBar from "./UpdateTaskBar";

import TaskTimer from "./TaskTimer";

import "../style/css/Task.css";

const Task = ({ todo, toggleTodo, updateTodo, deleteTodo, saveTimeIntoTodo }) => {
	const [edit, setEdit] = useState(null);
	const [newTodoText, setNewTodoText] = useState(todo.title);
	// const [timerHasStarted, setTimerHasStarted] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [timer, setTimer] = useState(15);
	const [seconds, setSeconds] = useState(null);
	const [renderReadyTimer, setRenderReadyTimer] = useState(false);
	const [renderTimer, setRenderTimer] = useState(false);

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

	// let watchHours = Math.floor(todo.timeSpent / 60 / 60)
	// 	.toString()
	// 	.padStart(2, "0");

	let watchMinutes = Math.floor((todo.timeSpent - Math.floor(todo.timeSpent / 3600) * 3600) / 60)
		.toString()
		.padStart(2, "0");

	// let watchMinutes = Math.floor(todo.timeSpent / 60)
	// 	.toString()
	// 	.padStart(2, "0");

	let watchSeconds = (todo.timeSpent - Math.floor(todo.timeSpent / 60) * 60)
		.toString()
		.padStart(2, "0");

	return (
		<div className="single-task-area">
			<div className="todo">
				<div className="todo-bullet"></div>
				<div
					className="todo-text"
					onClick={() => {
						toggleTodo(todo);
					}}
					key={todo.id}
					style={{ textDecoration: todo.done ? "line-through" : undefined }}
				>
					{todo.title}{" "}
					<i
						class="fa fa-pencil"
						aria-hidden="true"
						onClick={() => {
							setEdit(todo);
						}}
					></i>
					<i
						class="fa fa-times"
						aria-hidden="true"
						onClick={() => {
							deleteTodo(todo);
						}}
					></i>
				</div>
			</div>
			<div className="total-time">
				Total time spent: {`${watchHours}:${watchMinutes}:${watchSeconds}`}{" "}
				<button
					className="timer-button"
					onClick={() => {
						// setTimerHasStarted(true);
						setIsRunning(true);
						setSeconds(timer);
						setRenderReadyTimer(false);
						setRenderTimer(true);
					}}
				>
					Start timer
				</button>
			</div>

			{renderTimer === true ? (
				<TaskTimer
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					todo={todo}
					saveTimeIntoTodo={saveTimeIntoTodo}
					seconds={seconds}
					setSeconds={setSeconds}
					timer={timer}
					renderReadyTimer={renderReadyTimer}
					setRenderReadyTimer={setRenderReadyTimer}
					setRenderTimer={setRenderTimer}
				/>
			) : null}
		</div>
	);
};

export default Task;
