import React from "react";

import "../style/css/About.css";

const About = () => {
	return (
		<div className="about">
			<div>
				<h1>About me</h1>
			</div>
			<div>
				<p>Hello and welcome to my todolist!</p>
				<p>
					You can start adding your tasks right away, but if you want them to be saved, please sign
					in.
				</p>
				<p>
					You can add a project to every task simply by adding the hashtag in front. For example,
					write "Finish my homework #school", and your task will be automatically added into
					"school" project
				</p>
				<p>
					Technologies and tools used in this project are:
					<ul>
						<li>React (with context and function components with hooks)</li>
						<li>PHP and Symfony</li>
						<li>Sass</li>
						<li>Bootstrap</li>
						<li>Firebase</li>
						<li>Photoshop</li>
						<li>Heroku</li>
						<li>Chart.js</li>
					</ul>
				</p>
			</div>
		</div>
	);
};

export default About;
