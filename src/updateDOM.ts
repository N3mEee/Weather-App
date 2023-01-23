export default function updateDOM(data: any) {
    const ICON_LINK = `http://openweathermap.org/img/wn/`;

    const date = new Date()
    const minute = date.getMinutes()
    const timezoneOffset = date.getTimezoneOffset()
    const newHour = minute + timezoneOffset + (data.timezone / 60)

    const left = document.querySelector(".left");
    const right = document.querySelector(".right");

    const oldWeatherCity = document.querySelector(".weather-container");
    oldWeatherCity ? left!.removeChild(oldWeatherCity) : false;

    const weather = document.createElement("div");
    weather.className = "weather-container";
    left!.appendChild(weather);

    const oldRightWeatherCity = document.querySelector(".weather-right-container");
    oldRightWeatherCity ? right!.removeChild(oldRightWeatherCity) : false;

    const weatherRight = document.createElement("div");
    weatherRight.className = "weather-right-container";
    right!.appendChild(weatherRight);

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