const style = require("./style.css");
const ICON_LINK = `http://openweathermap.org/img/wn/`;
const content = document.querySelector("#content");

createDOM();

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
    const form = document.createElement("form");
    content.appendChild(form);

    const label = document.createElement("label");
    label.textContent = "City:";
    label.setAttribute("for", "city");
    form.appendChild(label);

    const input = document.createElement("input");
    input.id = "city";
    input.name = "city";
    input.required = true;
    form.appendChild(input);

    const button = document.createElement("button");
    button.textContent = "Request weather";
    form.appendChild(button);
}

//Update DOM with weather data
function updateDOM(data: any) {
    const oldWeatherCity = document.querySelector(".weather");
    oldWeatherCity ? content.removeChild(oldWeatherCity) : false;

    const weather = document.createElement("div");
    weather.className = "weather";
    content.appendChild(weather);

    const weatherCity = document.createElement("p");
    weatherCity.className = "weather-city";
    weatherCity.textContent = `${data.name} ${data.sys.country}`;
    console.log(data);
    weather.appendChild(weatherCity);

    const weatherTemp = document.createElement("div");
    weatherTemp.className = "weather-city";
    weatherTemp.textContent = `${parseInt(data.main.temp)} °C`;
    weather.appendChild(weatherTemp);

    const img = document.createElement("img");
    img.src = `${ICON_LINK}${data.weather[0].icon}@2x.png`;
    weather.appendChild(img);

    const weatherStatus = document.createElement("p");
    weatherStatus.className = "weather-status";
    weatherStatus.textContent = data.weather[0].description;
    weather.appendChild(weatherStatus);
}

//Form event
const form = document.querySelector("form");
form.onsubmit = (e) => {
    e.preventDefault();
    const cityName: HTMLInputElement = document.querySelector("input[id='city");
    createWeatherElement(cityName.value, "metric");
};
