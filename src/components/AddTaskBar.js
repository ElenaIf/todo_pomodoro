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
		<div className="task-input">
			<form onSubmit={(event) => submitNewTask(event)}>
				<input
					name="todo"
					placeholder="Add your task here"
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
