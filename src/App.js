import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskTimer2 from "./components/TaskTimer2";

import Main from "./pages/Main";

const initialTodos = [
	{
		id: 1,
		title: "Finish doing my homework",
		done: true,
		timeSpent: 50,
		color: "hsl(299, 36%, 55%)",
	},
	{
		id: 2,
		title: "Clean at home",
		done: false,
		timeSpent: 150,
		color: "hsl(283, 24%, 88%)",
	},
];

const App = () => {
	const [todosArray, setTodosArray] = useState(initialTodos);
	const [showSecondTimer, setshowSecondTimer] = useState(false);

	const getRandomColor = () => {
		// Math.floor(Math.random() * (max - min + 1) + min)
		let h = Math.floor(Math.random() * (300 - 180 + 1) + 180);
		let s = Math.floor(Math.random() * (90 - 20 + 1) + 20);
		let l = Math.floor(Math.random() * (95 - 50 + 1) + 50);
		let color = "hsl(" + h + ", " + s + "%, " + l + "%)";
		return color;
		// var letters = "0123456789ABCDEF".split("");
		// var color = "#";
		// for (var i = 0; i < 6; i++) {
		// 	color += letters[Math.floor(Math.random() * 16)];
		// }
		// return color;
	};

	let newColor = getRandomColor();

	console.log("new color is ", newColor);

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
				timeSpent: 200,
				color: newColor,
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
			{showSecondTimer === false ? (
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
						setshowSecondTimer={setshowSecondTimer}
					/>
					<Footer />
				</Router>
			) : (
				<div></div>
				// <TaskTimer2
				// 	isRunning={isRunning}
				// 	setIsRunning={setIsRunning}
				// 	todo={todo}
				// 	saveTimeIntoTodo={saveTimeIntoTodo}
				// 	seconds={seconds}
				// 	setSeconds={setSeconds}
				// 	timer={timer}
				// 	renderReadyTimer={renderReadyTimer}
				// 	setRenderReadyTimer={setRenderReadyTimer}
				// 	setRenderTimer={setRenderTimer}
				// />
			)}
		</>
	);
};

export default App;
