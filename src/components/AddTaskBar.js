import React, { useState } from "react";

import "../style/css/AddTaskBar.css";

const AddTaskBar = ({ addTodo }) => {
	const [todoText, setTodoText] = useState("");

	const submitNewTask = (event) => {
		event.preventDefault();
		addTodo(todoText);
		setTodoText("");
	};

	const onInputChange = (event) => {
		event.persist();
		setTodoText(event.target.value);
	};
	return (
		<div className="taskbar">
			<p>Hello from task bar</p>
			<form onSubmit={(event) => submitNewTask(event)}>
				<input
					name="todo"
					value={todoText}
					onChange={(event) => {
						onInputChange(event);
					}}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default AddTaskBar;
