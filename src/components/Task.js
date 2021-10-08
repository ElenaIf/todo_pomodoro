import React, { useState } from "react";

// import UpdateTaskBar from "./UpdateTaskBar";

import TaskTimer from "./TaskTimer";

const Task = ({ todo, toggleTodo, updateTodo, deleteTodo, saveTimeIntoTodo }) => {
	const [edit, setEdit] = useState(null);
	const [newTodoText, setNewTodoText] = useState(todo.title);
	// const [timerHasStarted, setTimerHasStarted] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [timer, setTimer] = useState(1500);
	const [seconds, setSeconds] = useState(null);
	const [renderReadyTimer, setRenderReadyTimer] = useState(false);
	const [renderTimer, setRenderTimer] = useState(false);

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
					// setTimerHasStarted(true);
					setIsRunning(true);
					setSeconds(timer);
					setRenderReadyTimer(false);
					setRenderTimer(true);
				}}
			>
				Start timer
			</button>

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
		</>
	);
};

export default Task;
