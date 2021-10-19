import React, { useState } from "react";

import "../style/css/AddTaskBar.css";

const AddTaskBar = ({ addTodo, todosArray, setChosenProject, projectArray, chosenProject }) => {
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
			<div className="projects">
				{projectArray && projectArray.length > 0 && <div>Project filter: </div>}
				<div className="single-projects">
					{projectArray &&
						projectArray.length > 0 &&
						projectArray.map((project) => {
							return (
								<div
									className="project-div"
									onClick={() => {
										setChosenProject(project);
									}}
								>
									{project}
								</div>
							);
						})}
				</div>
				{chosenProject && (
					<div
						className="project-div  project-div-cancel "
						onClick={() => {
							setChosenProject(null);
						}}
					>
						Cancel
					</div>
				)}
			</div>
		</div>
	);
};

export default AddTaskBar;
