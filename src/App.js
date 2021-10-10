import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Main from "./pages/Main";

const initialTodos = [
	{
		id: 1,
		title: "Finish doing my homework",
		done: true,
		timeSpent: 0,
	},
	{
		id: 2,
		title: "Clean at home",
		done: false,
		timeSpent: 150,
	},
	{
		id: 3,
		title: "Take the dog out",
		done: false,
		timeSpent: 7245,
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
		<Router>
			<Header />
			<Main
				todosArray={todosArray}
				toggleTodo={toggleTodo}
				setTodosArray={setTodosArray}
				addTodo={addTodo}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				saveTimeIntoTodo={saveTimeIntoTodo}
			/>
			<Footer />
		</Router>
	);
};

export default App;
