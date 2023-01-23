import createDOM from "./createDOM";
import updateDOM from "./updateDOM";
import "./style.css"

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
        console.error(err);
    }
}

function createWeatherElement(city: string = "Tokyo", units: string = "metric") {
    getWeather(city, units)
        .then((data) => {
            updateDOM(data);
        })
        .catch((err) => {
            alert("Please enter a valid city name!");
            console.error(err);
        });
}

//Events
const form = document.querySelector("form");
if (!form) {
    console.error("form was not found");
} else {
    form.onsubmit = (e) => {
        e.preventDefault();
        const cityName: HTMLInputElement = document.querySelector("input[id='city")!;
        createWeatherElement(cityName.value, "metric");
    }
};

const cities = document.querySelectorAll(".city");
cities.forEach((city) => { addEventListenerForCities(city) });


//Misc
function addEventListenerForCities(city: Element) {
    city.addEventListener("click", () => {
        createWeatherElement(city.textContent!, "metric");
    })
}