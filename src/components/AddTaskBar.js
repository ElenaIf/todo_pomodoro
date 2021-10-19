import React, { useState } from "react";

import "../style/css/AddTaskBar.css";

const AddTaskBar = ({ addTodo, todosArray, setChosenProject }) => {
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

	let projectArray = [];

	if (todosArray !== undefined) {
		todosArray.forEach((element) => {
			if (element.hashtag !== null) {
				projectArray.push(element.hashtag);
				console.log(element.hashtag);
			}
			projectArray = Array.from(new Set(projectArray));
			return projectArray;
		});
	}

	console.log(projectArray);

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
				<div className="projects">
					{projectArray.map((project) => {
						return (
							<div
								onClick={() => {
									console.log("project is: ", project);
									setChosenProject(project);
									console.log(todosArray);
								}}
							>
								{project}
							</div>
						);
					})}

					<div
						onClick={() => {
							setChosenProject(null);
						}}
					>
						Cancel
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddTaskBar;
