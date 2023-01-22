const style = require("./style.css");
const ICON_LINK = `http://openweathermap.org/img/wn/`;
const content = document.querySelector("#content");

createDOM();
createWeatherElement();
// API request
async function getWeather(city: string, units: string) {
    try {
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=52d8035ac0c16510068651c855325611`
        );
        const data = await result.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

function createWeatherElement(city: string = "Tokyo", units: string = "metric") {
    getWeather(city, units)
        .then((data) => {
            updateDOM(data);
        })
        .catch((err) => {
            alert("Please enter a valid city name!");
            console.warn(err);
        });
}

//Update the form
function createDOM() {
    const left = document.createElement("div");
    left.className = "left";
    content.appendChild(left);

    const right = document.createElement("div");
    right.className = "right";
    content.appendChild(right);

    const form = document.createElement("form");
    form.className = "form";
    right.appendChild(form);

    const input = document.createElement("input");
    input.id = "city";
    input.name = "city";
    input.placeholder = "Enter city name"
    input.required = true;
    form.appendChild(input);

    const button = document.createElement("button");
    form.className = "serach-button";
    form.appendChild(button);

    const icon = document.createElement("i");
    icon.className = "gg-search";
    button.appendChild(icon);

    const popularCities = document.createElement("div");
    popularCities.className = "popular-cities";
    right.appendChild(popularCities);

    const popularCitiesTitle = document.createElement("p");
    popularCitiesTitle.className = "weather-cities-title";
    popularCitiesTitle.textContent = "Popular Cities:";
    popularCities.appendChild(popularCitiesTitle);

    const berlin = document.createElement("div");
    berlin.className = "city";
    berlin.textContent = "Berlin"
    popularCities.appendChild(berlin);

    const paris = document.createElement("div");
    paris.className = "city";
    paris.textContent = "Paris"
    popularCities.appendChild(paris);

    const tokyo = document.createElement("div");
    tokyo.className = "city";
    tokyo.textContent = "Tokyo"
    popularCities.appendChild(tokyo);

    const madrid = document.createElement("div");
    madrid.className = "city";
    madrid.textContent = "Madrid"
    popularCities.appendChild(madrid);
}

//Update DOM with weather data
function updateDOM(data: any) {
    const date = new Date()
    const minute = date.getMinutes()
    const timezoneOffset = date.getTimezoneOffset()
    const newHour = minute + timezoneOffset + (data.timezone / 60)

    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    console.log(data);

    const oldWeatherCity = document.querySelector(".weather-container");
    oldWeatherCity ? left.removeChild(oldWeatherCity) : false;

    const weather = document.createElement("div");
    weather.className = "weather-container";
    left.appendChild(weather);

    const oldRightWeatherCity = document.querySelector(".weather-right-container");
    oldRightWeatherCity ? right.removeChild(oldRightWeatherCity) : false;

    const weatherRight = document.createElement("div");
    weatherRight.className = "weather-right-container";
    right.appendChild(weatherRight);

    const weatherTemp = document.createElement("div");
    weatherTemp.className = "city-weather-temp";
    weatherTemp.textContent = `${parseInt(data.main.temp)}°`;
    weather.appendChild(weatherTemp);

    const cityDetails = document.createElement("div");
    cityDetails.className = "city-details";
    weather.appendChild(cityDetails);

    const weatherCity = document.createElement("p");
    weatherCity.className = "city-name";
    weatherCity.textContent = `${data.name}, ${data.sys.country}`;
    cityDetails.appendChild(weatherCity);

    const cityDate = document.createElement("p");
    cityDate.className = "city-date";
    date.setMinutes(newHour);
    cityDate.textContent = `${date.toDateString()}`;
    cityDetails.appendChild(cityDate);

    const cityTime = document.createElement("p");
    cityTime.className = "city-time";
    cityTime.textContent = `${date.toTimeString().slice(0, 8)}`;
    cityDetails.appendChild(cityTime);

    const weatherDetails = document.createElement("div");
    weatherDetails.className = "weather-details";
    weather.appendChild(weatherDetails);

    const img = document.createElement("img");
    img.className = "city-weather-icon";
    img.src = `${ICON_LINK}${data.weather[0].icon}@2x.png`;
    weatherDetails.appendChild(img);

    const weatherStatus = document.createElement("p");
    weatherStatus.className = "city-weather-status";
    weatherStatus.textContent = data.weather[0].main;
    weatherDetails.appendChild(weatherStatus);

    const weatherDetailsTitle = document.createElement("p");
    weatherDetailsTitle.className = "weather-details-title";
    weatherDetailsTitle.textContent = "Weather Details:";
    weatherRight.appendChild(weatherDetailsTitle);

    const weatherHumidity = document.createElement("p");
    weatherHumidity.className = "weather-humidity";
    weatherHumidity.textContent = `Humidity: ${data.main.humidity}`;
    weatherRight.appendChild(weatherHumidity);

    const weatherWind = document.createElement("p");
    weatherWind.className = "weather-wind";
    weatherWind.textContent = `Wind: ${data.wind.speed}km/h`;
    weatherRight.appendChild(weatherWind);

    const weatherFeelsLike = document.createElement("p");
    weatherFeelsLike.className = "weather-feels-like";
    weatherFeelsLike.textContent = `Feels Like: ${parseInt(data.main.feels_like)}°`;
    weatherRight.appendChild(weatherFeelsLike);
}

//Form event
const form = document.querySelector("form");
form.onsubmit = (e) => {
    e.preventDefault();
    const cityName: HTMLInputElement = document.querySelector("input[id='city");
    createWeatherElement(cityName.value, "metric");
};
