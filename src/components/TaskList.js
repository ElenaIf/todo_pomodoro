import React from "react";

import Task from "./Task";

import "../style/css/TaskList.css";

const TaskList = ({
	setTodosArray,
	todosArray,
	toggleTodo,
	updateTodo,
	deleteTodo,
	saveTimeIntoTodo,
	setshowSecondTimer,
}) => {
	return (
		<div className="tasks-area">
			<div className="tasks">
				{todosArray.map((todo) => (
					<Task
						key={todo.id}
						todo={todo}
						toggleTodo={toggleTodo}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
						todosArray={todosArray}
						setTodosArray={setTodosArray}
						saveTimeIntoTodo={saveTimeIntoTodo}
						setshowSecondTimer={setshowSecondTimer}
					/>
				))}
			</div>
		</div>
	);
};

export default TaskList;
