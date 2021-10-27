import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import "./style/css/App.css";

import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";

import TaskTimer from "./components/TaskTimer";

const baseURL = "https://todo-pomodoro-backend.herokuapp.com/notes/find";
const postURL = "https://todo-pomodoro-backend.herokuapp.com/notes/add";
const deleteURL = "https://todo-pomodoro-backend.herokuapp.com/notes/delete";
const editURL = "https://todo-pomodoro-backend.herokuapp.com/notes/edit";

const App = () => {
	const [todosArray, setTodosArray] = useState([]);
	const [todosArrayUnregistered, setTodosArrayUnregistered] = useState([]);
	const [downloadingTasks, setDownloadingTasks] = useState(true);

	const { currentUser } = useAuth();

	let userid;

	if (currentUser) {
		userid = currentUser.uid;
	}

	const getNotes = async () => {
		try {
			const resp = await axios.get(`${baseURL}/${currentUser.uid}`);
			setDownloadingTasks(false);
			setTodosArray(resp.data);
		} catch (err) {
			console.log(err);
		}
	};

	const [showSecondTimer, setshowSecondTimer] = useState(false); // to render the timer on the screen
	const [isRunning, setIsRunning] = useState(false); // to check if the timer is running
	const [selectedTodo, setSelectedTodo] = useState({});
	const [seconds, setSeconds] = useState(null);
	const [timer, setTimer] = useState(1500); // set the timer for 25 minutes
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
		//find in the input some word with # sign and make it string instead of array.
		let inputHashtag = todoText.match(/(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)\b(?!;)/gi);

		let newTodoText = todoText; // to keep the original in store

		if (inputHashtag) {
			inputHashtag.forEach((element) => {
				newTodoText = newTodoText.replace(element + " ", "");
				newTodoText = newTodoText.replace(" " + element, "");
			});
		}

		if (todoText !== "") {
			let newTodo;
			if (inputHashtag) {
				let project = inputHashtag.slice(0, 1).join().substring(1);
				newTodo = {
					title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
					done: false,
					timeSpent: 0,
					color: newColor,
					userid: currentUser.uid,
					hashtag: project,
					hashtags: inputHashtag.slice(1, inputHashtag.length),
				};
				axios.post(postURL, newTodo).then(getNotes());
			} else {
				newTodo = {
					title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
					done: false,
					timeSpent: 0,
					color: newColor,
					userid: currentUser.uid,
					hashtag: "No project",
					hashtags: [],
				};
				axios.post(postURL, newTodo).then(getNotes());
			}

			// .then(setTodosArray([newTodo, ...todosArray]));
		}

		getNotes();
	};

	const addTodoUnregistered = (todoText) => {
		//find in the input some word with # sign and make it string instead of array.
		let inputHashtag = todoText.match(/(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)\b(?!;)/gi);

		let newTodoText = todoText; // to keep the original in store

		if (inputHashtag) {
			inputHashtag.forEach((element) => {
				newTodoText = newTodoText.replace(element + " ", "");
				newTodoText = newTodoText.replace(" " + element, "");
			});
		}

		if (todoText !== "") {
			let newTodo;
			if (inputHashtag) {
				let project = inputHashtag.slice(0, 1).join().substring(1);
				newTodo = {
					id: Date.now(),
					title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
					done: false,
					timeSpent: 0,
					color: newColor,
					hashtag: project,
					hashtags: inputHashtag.slice(1, inputHashtag.length),
				};
			} else {
				newTodo = {
					id: Date.now(),
					title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
					done: false,
					timeSpent: 0,
					color: newColor,
					hashtag: "No Project",
					hashtags: [],
				};
			}
			setTodosArrayUnregistered([newTodo, ...todosArrayUnregistered]);
		}
	};

	const updateTodo = (todo, newValue) => {
		let inputHashtag = newValue.match(/(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)\b(?!;)/gi);

		let newTodoText = newValue;

		if (inputHashtag) {
			inputHashtag.forEach((element) => {
				newTodoText = newTodoText.replace(element + " ", "");
				newTodoText = newTodoText.replace(" " + element, "");
			});
		}

		let updatedTasks = [];
		let newItem = {};

		if (inputHashtag) {
			let project = inputHashtag.slice(0, 1).join().substring(1);

			updatedTasks = todosArray.map((t) => {
				return t.id === todo.id
					? {
							...t,
							title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
							hashtag: project,
							hashtags: inputHashtag.slice(1, inputHashtag.length),
					  }
					: t;
			});
			newItem = {
				title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
				done: todo.done,
				timeSpent: todo.timeSpent,
				userid: todo.userid,
				hashtag: project,
				hashtags: inputHashtag.slice(1, inputHashtag.length),
			};
		} else {
			updatedTasks = todosArray.map((t) => {
				return t.id === todo.id
					? {
							...t,
							title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
					  }
					: t;
			});
			newItem = {
				title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
				done: todo.done,
				timeSpent: todo.timeSpent,
				userid: todo.userid,
				hashtag: todo.hashtag,
			};
		}

		if (newValue !== "") {
			axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
		}
	};

	const updateTodoUnregistered = (todo, newValue) => {
		//find in the input some word with # sign and make it string instead of array.
		let inputHashtag = newValue.match(/(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)\b(?!;)/gi);

		let newTodoText = newValue; // to keep the original in store

		if (inputHashtag) {
			inputHashtag.forEach((element) => {
				newTodoText = newTodoText.replace(element + " ", "");
				newTodoText = newTodoText.replace(" " + element, "");
			});
		}

		let updatedTasks = [];

		if (inputHashtag) {
			let project = inputHashtag.slice(0, 1).join().substring(1);

			updatedTasks = todosArrayUnregistered.map((t) => {
				return t.id === todo.id
					? {
							...t,
							title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
							hashtag: project,
							hashtags: inputHashtag.slice(1, inputHashtag.length),
					  }
					: t;
			});
		} else {
			updatedTasks = todosArrayUnregistered.map((t) => {
				return t.id === todo.id
					? {
							...t,
							title: newTodoText.charAt(0).toUpperCase() + newTodoText.slice(1),
					  }
					: t;
			});
		}

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

	const deleteProject = (todo) => {
		const updatedTasks = todosArray.map((t) => {
			return t.id === todo.id ? { ...t, hashtag: "No Project" } : t;
		});

		const newItem = {
			title: todo.title,
			done: todo.done,
			timeSpent: todo.timeSpent,
			userid: todo.userid,
			hashtag: "No Project",
		};

		axios.put(`${editURL}/${todo.id}`, newItem).then(setTodosArray(updatedTasks));
		console.log(todo.hashtag);
	};

	const deleteProjectUnregistered = (todo) => {
		const updatedTasks = todosArrayUnregistered.map((t) => {
			return t.id === todo.id ? { ...t, hashtag: "No Project" } : t;
		});

		setTodosArrayUnregistered(updatedTasks);
		console.log(todo.hashtag);
	};

	const deleteTodo = (todo) => {
		const filteredTasks = [...todosArray.filter((task) => task.id !== todo.id)];
		axios.delete(`${deleteURL}/${todo.id}`).then(setTodosArray(filteredTasks));
	};

	const deleteTodoUnregistered = (todo) => {
		const filteredTasks = [...todosArrayUnregistered.filter((task) => task.id !== todo.id)];
		setTodosArrayUnregistered(filteredTasks);
	};

	useEffect(() => {
		getNotes();
	}, [userid]);

	return (
		<>
			{showSecondTimer === false ? (
				<Router>
					<Header />
					<Main
						downloadingTasks={downloadingTasks}
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
						deleteProjectUnregistered={deleteProjectUnregistered}
						deleteProject={deleteProject}
					/>
					<div id="circle1"></div>
					<Footer />
				</Router>
			) : (
				<TaskTimer
					setshowSecondTimer={setshowSecondTimer}
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					selectedTodo={selectedTodo}
					setSelectedTodo={setSelectedTodo}
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
