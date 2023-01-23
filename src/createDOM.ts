export default function createDOM() {
    const left = document.createElement("div");
    const content = document.querySelector("#content");

    left.className = "left";
    content!.appendChild(left);

    const right = document.createElement("div");
    right.className = "right";
    content!.appendChild(right);

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