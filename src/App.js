import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainLeft from "./pages/MainLeft";
import MainRight from "./pages/MainRight";

// import axios from "axios";

// const initialTodos = [
// 	{
// 		id: 1,
// 		title: "do groceries",
// 		done: true,
// 		timeSpent: 0,
// 	},
// 	{
// 		id: 2,
// 		title: "do dishes",
// 		done: false,
// 		timeSpent: 150,
// 	},
// 	{
// 		id: 3,
// 		title: "cleaning",
// 		done: false,
// 		timeSpent: 0,
// 	},
// ];

const baseURL = "http://localhost:3001/notes";

const App = () => {
	const [todosArray, setTodosArray] = useState([]);

	useEffect(() => {
		axios.get(baseURL).then((response) => {
			setTodosArray(response.data);
		});
	}, [setTodosArray]);

	const toggleTodo = (todo) => {
		// setTodosArray(
		// 	todosArray.map((t) => {
		// 		return t.id === todo.id ? { ...t, done: !t.done } : t;
		// 	})
		// );

		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, done: !t.done } : t;
		});
		const newItem = {
			id: todo.id,
			title: todo.title,
			done: !todo.done,
			timeSpent: todo.timeSpent,
		};

		axios.put(`${baseURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
	};

	const addTodo = (todoText) => {
		if (todoText !== "") {
			const newTodo = {
				id: Date.now(),
				title: todoText,
				done: false,
				timeSpent: 0,
			};
			axios.post(baseURL, newTodo).then((resp) => {
				console.log(resp.data);
				setTodosArray([resp.data, ...todosArray]);
			});
			// setTodosArray([newTodo, ...todosArray]);
		}
	};

	const updateTodo = (todo, newValue) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, title: newValue } : t;
		});
		const newItem = {
			id: todo.id,
			title: newValue,
			done: todo.done,
			timeSpent: todo.timeSpent,
		};
		if (newValue !== "") {
			axios.put(`${baseURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
		}
	};

	const saveTimeIntoTodo = (todo, newTime) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, timeSpent: newTime } : t;
		});
		const newItem = {
			id: todo.id,
			title: todo.title,
			done: todo.done,
			timeSpent: newTime,
		};

		axios.put(`${baseURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
	};

	const deleteTodo = (todo) => {
		const filteredTasks = [...todosArray.filter((task) => task.id !== todo.id)];

		axios.delete(`${baseURL}/${todo.id}`).then(setTodosArray(filteredTasks));

		// setTodosArray([...todosArray.filter((task) => task.id !== todo.id)]);
	};

	return (
		<>
			<div className="container">
				<Header />

				{/* <button onClick={this.getAllNotes}>Click me</button> */}
				<main>
					<MainLeft
						todosArray={todosArray}
						toggleTodo={toggleTodo}
						setTodosArray={setTodosArray}
						addTodo={addTodo}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
						saveTimeIntoTodo={saveTimeIntoTodo}
					/>
					<MainRight />
				</main>
				<Footer />
			</div>
		</>
	);
};

export default App;
