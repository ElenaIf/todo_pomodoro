import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainLeft from "./pages/MainLeft";
import MainRight from "./pages/MainRight";

const initialTodos = [
	{
		id: 1,
		title: "do groceries",
		done: true,
		timeSpent: 0,
	},
	{
		id: 2,
		title: "do dishes",
		done: false,
		timeSpent: 150,
	},
	{
		id: 3,
		title: "cleaning",
		done: false,
		timeSpent: 0,
	},
];

const App = () => {
	const [todosArray, setTodosArray] = useState(initialTodos);

	const toggleTodo = (todo) => {
		setTodosArray(
			todosArray.map((t) => {
				return t.id === todo.id ? { ...t, done: !t.done } : t;
			})
		);
	};

	const addTodo = (todoText) => {
		if (todoText !== "") {
			const newTodo = {
				id: Date.now(),
				title: todoText,
				done: false,
				timeSpent: 0,
			};

			setTodosArray([newTodo, ...todosArray]);
		}
	};

	const updateTodo = (todo, newValue) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, title: newValue } : t;
		});
		setTodosArray(updatedTasks);
	};

	const saveTimeIntoTodo = (todo, newTime) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, timeSpent: newTime } : t;
		});

		setTodosArray(updatedTasks);
	};

	const deleteTodo = (todo) => {
		const filteredTasks = [...todosArray.filter((task) => task.id !== todo.id)];

		setTodosArray(filteredTasks);

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
