import React, { useState } from "react";

// import UpdateTaskBar from "./UpdateTaskBar";

import TaskTimer from "./TaskTimer";

const Task = ({ todo, toggleTodo, updateTodo, deleteTodo, saveTimeIntoTodo }) => {
	const [edit, setEdit] = useState(null);
	const [newTodoText, setNewTodoText] = useState(todo.title);
	const [timerHasStarted, setTimerHasStarted] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	if (edit) {
		return (
			<form
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

	return (
		<>
			<li
				onClick={() => {
					toggleTodo(todo);
				}}
				key={todo.id}
				style={{ textDecoration: todo.done ? "line-through" : undefined }}
			>
				{todo.title} - Time spent: {todo.timeSpent}
			</li>
			<button
				onClick={() => {
					setEdit(todo);
				}}
			>
				Update
			</button>
			<button
				onClick={() => {
					deleteTodo(todo);
				}}
			>
				Remove
			</button>
			<button
				onClick={() => {
					setTimerHasStarted(!timerHasStarted);
				}}
			>
				Start timer
			</button>
			<button
				onClick={() => {
					setTimerHasStarted(true);
					setIsRunning(true);
					setSeconds(0);
				}}
			>
				Start from the beginning
			</button>

			{timerHasStarted === true ? (
				<TaskTimer
					seconds={seconds}
					isRunning={isRunning}
					todo={todo}
					saveTimeIntoTodo={saveTimeIntoTodo}
					setIsRunning={setIsRunning}
					setSeconds={setSeconds}
					setTimerHasStarted={setTimerHasStarted}
				/>
			) : (
				<div>Not started</div>
			)}
		</>
	);
};

export default Task;
