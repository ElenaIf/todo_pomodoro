import React from "react";

import AddTaskBar from "../components/AddTaskBar";
import TaskList from "../components/TaskList";

const MainLeft = ({
	setTodosArray,
	todosArray,
	toggleTodo,
	addTodo,
	updateTodo,
	deleteTodo,
	saveTimeIntoTodo,
}) => {
	return (
		<div className="main-left">
			<AddTaskBar addTodo={addTodo} />
			<TaskList
				todosArray={todosArray}
				toggleTodo={toggleTodo}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				setTodosArray={setTodosArray}
				saveTimeIntoTodo={saveTimeIntoTodo}
			/>
		</div>
	);
};

export default MainLeft;
