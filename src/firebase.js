import { initializeApp } from "firebase/app";
import "firebase/auth";

const fireApp = initializeApp({
	apiKey: "AIzaSyCpdN2DJTv8k9w7vjusQ9I8p5eIAdI_VFI",
	authDomain: "pomodoro-todo-users.firebaseapp.com",
	projectId: "pomodoro-todo-users",
	storageBucket: "pomodoro-todo-users.appspot.com",
	messagingSenderId: "194568515122",
	appId: "1:194568515122:web:683dac16dfcf4bae0c162b",
	measurementId: "G-G7SCNLBN8V",
});

export default fireApp;
