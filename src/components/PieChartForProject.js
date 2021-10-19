import React, { useState, useEffect } from "react";

import { Pie } from "react-chartjs-2";

import "../style/css/PieChart.css";

const PieChart = ({ todosArray, projectArray }) => {
	const [chartData, setChartData] = useState({});
	let secondsArray = [];
	let colorsArray = [];

	const getRandomColor = () => {
		let h = Math.floor(Math.random() * (300 - 180 + 1) + 180);
		let s = Math.floor(Math.random() * (90 - 20 + 1) + 20);
		let l = Math.floor(Math.random() * (95 - 50 + 1) + 50);
		let color = "hsl(" + h + ", " + s + "%, " + l + "%)";
		return color;
	};

	projectArray.forEach((project) => {
		let totalSecondsForProject = 0;
		todosArray.forEach((todo) => {
			if (project === todo.hashtag) {
				totalSecondsForProject = totalSecondsForProject + todo.timeSpent;
			}
		});
		secondsArray.push(totalSecondsForProject);
	});

	projectArray.forEach(() => {
		colorsArray.push(getRandomColor());
	});

	const chart = () => {
		setChartData({
			labels: projectArray,
			datasets: [
				{
					data: secondsArray,
					backgroundColor: colorsArray,
					borderWidth: 0,
				},
			],
		});
	};

	useEffect(() => {
		chart();
	}, [todosArray]);

	return (
		<Pie
			data={chartData}
			options={{
				responsive: true,
				plugins: {
					title: {
						display: false,
						text: "Projects",
						color: "#6f42c1",
					},
					tooltip: {
						enabled: true,
						callbacks: {
							label: function (tooltipItems) {
								let chartHours = Math.floor(tooltipItems.raw / 3600)
									.toString()
									.padStart(2, "0");

								let chartMinutes = Math.floor(
									(tooltipItems.raw - Math.floor(tooltipItems.raw / 3600) * 3600) / 60
								)
									.toString()
									.padStart(2, "0");

								let chartSeconds = (tooltipItems.raw - Math.floor(tooltipItems.raw / 60) * 60)
									.toString()
									.padStart(2, "0");

								return ` ${tooltipItems.label} - ${chartHours}:${chartMinutes}:${chartSeconds}`;
							},
						},
					},
					legend: {
						display: false,
					},
				},
			}}
		/>
	);
};

export default PieChart;
