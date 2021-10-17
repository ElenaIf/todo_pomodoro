import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";

import TaskTimer from "./components/TaskTimer";

const baseURL = "https://todo-pomodoro-backend.herokuapp.com/notes/find";
const postURL = "https://todo-pomodoro-backend.herokuapp.com/notes/add";
const deleteURL = "https://todo-pomodoro-backend.herokuapp.com/notes/delete";
const editURL = "https://todo-pomodoro-backend.herokuapp.com/notes/edit";

const initialTodos = [
	{
		id: 1,
		title: "Finish doing my homework",
		done: true,
		timeSpent: 50,
		color: "hsl(299, 36%, 55%)",
		hashtag: "home",
	},
	{
		id: 2,
		title: "Clean at home",
		done: false,
		timeSpent: 110,
		color: "hsl(283, 24%, 88%)",
		hashtag: "work",
	},
];

const App = () => {
	const [todosArray, setTodosArray] = useState([]);
	const [todosArrayUnregistered, setTodosArrayUnregistered] = useState(initialTodos);

	const { currentUser } = useAuth();

	let userid;

	if (currentUser) {
		userid = currentUser.uid;
	}

	const getNotes = async () => {
		try {
			const resp = await axios.get(`${baseURL}/${currentUser.uid}`);
			setTodosArray(resp.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getNotes();
	}, [userid]);

	// to render the timer on the screen
	const [showSecondTimer, setshowSecondTimer] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState("");
	const [seconds, setSeconds] = useState(null);
	const [timer, setTimer] = useState(5);
	const [renderReadyTimer, setRenderReadyTimer] = useState(false);

	const getRandomColor = () => {
		let h = Math.floor(Math.random() * (300 - 180 + 1) + 180);
		let s = Math.floor(Math.random() * (90 - 20 + 1) + 20);
		let l = Math.floor(Math.random() * (95 - 50 + 1) + 50);
		let color = "hsl(" + h + ", " + s + "%, " + l + "%)";
		return color;
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
			userid: todo.userid,
			hashtag: todo.hashtag,
		};

		axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
	};

	const toggleTodoUnregistered = (todo) => {
		setTodosArrayUnregistered(
			todosArrayUnregistered.map((t) => {
				return t.id === todo.id ? { ...t, done: !t.done } : t;
			})
		);
	};

	const addTodo = (todoText) => {
		if (todoText !== "") {
			const newTodo = {
				title: todoText,
				done: false,
				timeSpent: 0,
				color: newColor,
				userid: currentUser.uid,
				hashtag: "work",
			};
			axios.post(postURL, newTodo).then(setTodosArray([newTodo, ...todosArray]));
		}
	};

	const addTodoUnregistered = (todoText) => {
		if (todoText !== "") {
			const newTodo = {
				id: Date.now(),
				title: todoText,
				done: false,
				timeSpent: 0,
				color: newColor,
				hashtag: "work",
			};

			setTodosArrayUnregistered([newTodo, ...todosArrayUnregistered]);
		}
	};

	const updateTodo = (todo, newValue) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, title: newValue } : t;
		});
		const newItem = {
			title: newValue,
			done: todo.done,
			timeSpent: todo.timeSpent,
			userid: todo.userid,
			hashtag: todo.hashtag,
		};
		if (newValue !== "") {
			axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
		}
	};

	const updateTodoUnregistered = (todo, newValue) => {
		const updatedTasks = todosArrayUnregistered.map((t) => {
			return t.id === todo.id ? { ...t, title: newValue } : t;
		});
		setTodosArrayUnregistered(updatedTasks);
	};

	const saveTimeIntoTodo = (todo, newTime) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, timeSpent: newTime } : t;
		});
		const newItem = {
			title: todo.title,
			done: todo.done,
			timeSpent: newTime,
			userid: todo.userid,
			hashtag: todo.hashtag,
		};

		axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
	};

	const saveTimeIntoTodoUnregistered = (todo, newTime) => {
		const updatedTasks = todosArrayUnregistered.map((t) => {
			return t.id === todo.id ? { ...t, timeSpent: newTime } : t;
		});

		setTodosArrayUnregistered(updatedTasks);
	};

	const deleteTodo = (todo) => {
		const filteredTasks = [...todosArray.filter((task) => task.id !== todo.id)];

		axios.delete(`${deleteURL}/${todo.id}`).then(setTodosArray(filteredTasks));
	};

	const deleteTodoUnregistered = (todo) => {
		const filteredTasks = [...todosArrayUnregistered.filter((task) => task.id !== todo.id)];
		setTodosArrayUnregistered(filteredTasks);
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
						setshowSecondTimer={setshowSecondTimer}
						timer={timer}
						isRunning={isRunning}
						setIsRunning={setIsRunning}
						setRenderReadyTimer={setRenderReadyTimer}
						setSelectedTodo={setSelectedTodo}
						setSeconds={setSeconds}
						todosArrayUnregistered={todosArrayUnregistered}
						setTodosArrayUnregistered={setTodosArrayUnregistered}
						toggleTodoUnregistered={toggleTodoUnregistered}
						addTodoUnregistered={addTodoUnregistered}
						updateTodoUnregistered={updateTodoUnregistered}
						saveTimeIntoTodoUnregistered={saveTimeIntoTodoUnregistered}
						deleteTodoUnregistered={deleteTodoUnregistered}
					/>
					<Footer />
				</Router>
			) : (
				<TaskTimer
					setshowSecondTimer={setshowSecondTimer}
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					selectedTodo={selectedTodo}
					seconds={seconds}
					setSeconds={setSeconds}
					timer={timer}
					renderReadyTimer={renderReadyTimer}
					setRenderReadyTimer={setRenderReadyTimer}
					saveTimeIntoTodo={saveTimeIntoTodo}
					saveTimeIntoTodoUnregistered={saveTimeIntoTodoUnregistered}
				/>
			)}
		</>
	);
};

export default App;
