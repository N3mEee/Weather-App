
async function getWeather(city: string) {
    try {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=52d8035ac0c16510068651c855325611`);
        const data = await result.json();
        console.log(data);
        createWeatherElement(data)
    } catch (err) {
        console.warn(err);
    }
}

const content = document.querySelector('#content')
const form = document.createElement('form');
content.appendChild(form);
const label = document.createElement('label');
label.setAttribute('for', 'city');
const input = document.createElement('input');
input.setAttribute('id', 'city');
form.appendChild(input);
const button = document.createElement('button');
button.textContent = 'Request weather'
form.appendChild(button);


button.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(input.value)
})


function createWeatherElement(data: any) {

    const oldWeatherCity = content.querySelector(".weather");
    (oldWeatherCity) ? content.removeChild(oldWeatherCity) : false;

    const weather = document.createElement("div");
    weather.className = "weather";
    content.appendChild(weather)

    const weatherCity = document.createElement("div");
    weatherCity.className = "weather-city"
    weatherCity.textContent = data.name;
    weather.appendChild(weatherCity)

    const weatherTemp = document.createElement("div");
    weatherTemp.className = "weather-city"
    weatherTemp.textContent = `${(parseInt(data.main.temp) - 273.15)}`;
    weather.appendChild(weatherTemp)
}