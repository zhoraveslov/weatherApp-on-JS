const tMin = document.querySelector(".tMin");
const tMax = document.querySelector(".tMax");
const date = document.querySelector(".date");
const sunrise = document.querySelector(".sunrise");
const maxWind = document.querySelector(".maxWind");
const sunset = document.querySelector(".sunset");
const dailyForecastTable = document.querySelector(".dailyForecastTable");


function getLocalStorage() {
	return localStorage.getItem("forecast")
		? JSON.parse(localStorage.getItem("forecast"))
		: [];
}

function getWeather() {
	fetch(
		"https://api.open-meteo.com/v1/forecast?latitude=50.07&longitude=14.43&hourly=temperature_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,pressure_msl,surface_pressure,cloudcover,windspeed_10m,winddirection_10m,direct_radiation&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max&forecast_days=16&timezone=Europe%2FBerlin"
	)
		.then((response) => response.json())
		.then((forecast) => {
			localStorage.setItem("forecast", JSON.stringify(forecast));
			console.log(forecast);
			getTodayForecast(forecast);
			createDailyForecast(forecast);
		});
}
function getTodayForecast(forecast) {
	tMin.textContent =
		forecast.daily.temperature_2m_min[0] +
		" " +
		forecast.daily_units.temperature_2m_min;
	tMax.textContent =
		forecast.daily.temperature_2m_max[0] +
		" " +
		forecast.daily_units.temperature_2m_min;
	let sunriseTime = Date.parse(forecast.daily.sunrise[0]);
	let correctSunriseTime = new Date(sunriseTime);
	sunrise.textContent =
		"Sunrise at: " +
		correctSunriseTime.getHours() +
		":" +
		correctSunriseTime.getMinutes();

	let sunsetTime = Date.parse(forecast.daily.sunset[0]);
	let correctSunsetTime = new Date(sunsetTime);
	sunset.textContent =
		"Sunset at: " +
		correctSunsetTime.getHours() +
		":" +
		correctSunsetTime.getMinutes();

	maxWind.textContent =
		"Maximun wind speed: " + forecast.daily.windspeed_10m_max[0] + " km/h";
	// cloudcover.textContent =
}

function createLi() {
	const liBtn = document.createElement("li");

	return liBtn;
}

function createDailyForecast(forecast) {
	for (let i = 1; i < forecast.daily.time.length; i++) {
		const date = forecast.daily.time[i];
		const tMin = ` ${forecast.daily.temperature_2m_min[i]} ${forecast.daily_units.temperature_2m_min}`;
		const tMax = `${forecast.daily.temperature_2m_max[i]} ${forecast.daily_units.temperature_2m_min}`;
		const li = createLi();
		dailyForecastTable.appendChild(li);
		li.append(date, tMin, tMax);
	}
}

getWeather();
