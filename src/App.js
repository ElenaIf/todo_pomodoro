import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";

import TaskTimer from "./components/TaskTimer";

const baseURL = "https://todo-pomodoro-backend.herokuapp.com/notes/all";
const postURL = "https://todo-pomodoro-backend.herokuapp.com/notes/add";
const deleteURL = "https://todo-pomodoro-backend.herokuapp.com/notes/delete";
const editURL = "https://todo-pomodoro-backend.herokuapp.com/notes/edit";

// const initialTodos = [
// 	{
// 		id: 1,
// 		title: "Finish doing my homework",
// 		done: true,
// 		timeSpent: 50,
// 		color: "hsl(299, 36%, 55%)",
// 	},
// 	{
// 		id: 2,
// 		title: "Clean at home",
// 		done: false,
// 		timeSpent: 150,
// 		color: "hsl(283, 24%, 88%)",
// 	},
// ];

const App = () => {
	const [todosArray, setTodosArray] = useState([]);

	const getNotes = async () => {
		try {
			const resp = await axios.get(baseURL);
			setTodosArray(resp.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getNotes();
	}, []);

	// to render the timer on the screen
	const [showSecondTimer, setshowSecondTimer] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState("");
	const [seconds, setSeconds] = useState(null);
	const [timer, setTimer] = useState(5);
	const [renderReadyTimer, setRenderReadyTimer] = useState(false);

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

	const toggleTodo = (todo) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, done: !t.done } : t;
		});
		const newItem = {
			title: todo.title,
			done: !todo.done,
			timeSpent: todo.timeSpent,
		};

		axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
	};

	// const toggleTodo = (todo) => {
	// 	setTodosArray(
	// 		todosArray.map((t) => {
	// 			return t.id === todo.id ? { ...t, done: !t.done } : t;
	// 		})
	// 	);
	// };

	const addTodo = (todoText) => {
		if (todoText !== "") {
			const newTodo = {
				title: todoText,
				done: false,
				timeSpent: 0,
				color: newColor,
			};
			axios.post(postURL, newTodo).then(setTodosArray([...todosArray, newTodo]));
		}
	};

	// const addTodo = (todoText) => {
	// 	if (todoText !== "") {
	// 		const newTodo = {
	// 			id: Date.now(),
	// 			title: todoText,
	// 			done: false,
	// 			timeSpent: 200,
	// 			color: newColor,
	// 		};

	// 		setTodosArray([newTodo, ...todosArray]);
	// 	}
	// };

	const updateTodo = (todo, newValue) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, title: newValue } : t;
		});
		const newItem = {
			title: newValue,
			done: todo.done,
			timeSpent: todo.timeSpent,
		};
		if (newValue !== "") {
			axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
		}
	};

	// const updateTodo = (todo, newValue) => {
	// 	const updatedTasks = todosArray.map((t) => {
	// 		return t.id === todo.id ? { ...t, title: newValue } : t;
	// 	});
	// 	setTodosArray(updatedTasks);
	// };

	const saveTimeIntoTodo = (todo, newTime) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, timeSpent: newTime } : t;
		});
		const newItem = {
			title: todo.title,
			done: todo.done,
			timeSpent: newTime,
		};

		axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
	};

	// const saveTimeIntoTodo = (todo, newTime) => {
	// 	const updatedTasks = todosArray.map((t) => {
	// 		return t.id === todo.id ? { ...t, timeSpent: newTime } : t;
	// 	});

	// 	setTodosArray(updatedTasks);
	// };

	const deleteTodo = (todo) => {
		const filteredTasks = [...todosArray.filter((task) => task.id !== todo.id)];

		axios.delete(`${deleteURL}/${todo.id}`).then(setTodosArray(filteredTasks));
	};

	// const deleteTodo = (todo) => {
	// 	const filteredTasks = [...todosArray.filter((task) => task.id !== todo.id)];

	// 	setTodosArray(filteredTasks);

	// 	// setTodosArray([...todosArray.filter((task) => task.id !== todo.id)]);
	// };

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
						setshowSecondTimer={setshowSecondTimer}
						timer={timer}
						isRunning={isRunning}
						setIsRunning={setIsRunning}
						setRenderReadyTimer={setRenderReadyTimer}
						setSelectedTodo={setSelectedTodo}
						setSeconds={setSeconds}
					/>
					<Footer />
				</Router>
			) : (
				<TaskTimer
					setshowSecondTimer={setshowSecondTimer}
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					selectedTodo={selectedTodo}
					saveTimeIntoTodo={saveTimeIntoTodo}
					seconds={seconds}
					setSeconds={setSeconds}
					timer={timer}
					renderReadyTimer={renderReadyTimer}
					setRenderReadyTimer={setRenderReadyTimer}
				/>
			)}
		</>
	);
};

export default App;
