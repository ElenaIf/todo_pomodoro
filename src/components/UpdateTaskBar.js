// import React, { useState } from "react";

// const UpdateTaskBar = (edit, submitUpdate) => {
// 	const [newTodoText, setNewTodoText] = useState(edit);

// 	return (
// 		<form
// 			onSubmit={(event) => {
// 				event.preventDefault();
// 				submitUpdate(edit.id, newTodoText);
// 			}}
// 		>
// 			<input
// 				name="todo"
// 				value={newTodoText}
// 				onChange={(event) => {
// 					event.persist();
// 					setNewTodoText(event.target.value);
// 				}}
// 			/>
// 			<button type="submit">Add</button>
// 		</form>
// 	);
// };

// export default UpdateTaskBar;
