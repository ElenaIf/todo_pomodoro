import React, { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainLeft from "./pages/MainLeft";
import MainRight from "./pages/MainRight";

// import axios from "axios";

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

// const getAllNotes = () => {
// 	axios.get("http://localhost:3002/notes").then((res) => {
// 		console.log(res.data[0].time);
// 	});
// };

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
		if (newValue !== "") {
			setTodosArray(
				todosArray.map((t) => {
					return t.id === todo.id ? { ...t, title: newValue } : t;
				})
			);
		}
	};

	const saveTimeIntoTodo = (todo, newTime) => {
		setTodosArray(
			todosArray.map((t) => {
				return t.id === todo.id ? { ...t, timeSpent: newTime } : t;
			})
		);
	};

	const deleteTodo = (todo) => {
		setTodosArray([...todosArray.filter((task) => task.id !== todo.id)]);
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
					<MainRight todosArray={todosArray} />
				</main>
				<Footer />
			</div>
		</>
	);
};

export default App;
