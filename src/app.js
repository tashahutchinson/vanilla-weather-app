function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let maxElement = document.querySelector("#current-max");
    maxElement.innerHTML = Math.round(response.data.main.temp_max);

    let minElement = document.querySelector("#current-min");
    minElement.innerHTML = Math.round(response.data.main.temp_min);

    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = Math.round(response.data.main.humidity);

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "7221c1b666843ec019546f9ad14749ae"
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);