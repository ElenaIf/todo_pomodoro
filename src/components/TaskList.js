import React from "react";

import Task from "./Task";

import "../style/css/TaskList.css";

const TaskList = ({
	setTodosArray,
	todosArray,
	toggleTodo,
	updateTodo,
	deleteTodo,
	setshowSecondTimer,
	setIsRunning,
	timer,
	setRenderReadyTimer,
	setSelectedTodo,
	setSeconds,
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
						setshowSecondTimer={setshowSecondTimer}
						setIsRunning={setIsRunning}
						timer={timer}
						setRenderReadyTimer={setRenderReadyTimer}
						setSelectedTodo={setSelectedTodo}
						setSeconds={setSeconds}
					/>
				))}
			</div>
		</div>
	);
};

export default TaskList;
