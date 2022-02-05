function formatDate(timestamp) {
    let date = new Date(timestamp);

    let hours = date.getHours();
        if (hours < 10) {
        hours = `0${hours}`;
        }

    let minutes = date.getMinutes();
        if (minutes < 10) {
        minutes = `0${minutes}`;
        }

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let weekday = weekdays[date.getDay()];

    return ` ${weekday} | ${hours}:${minutes}`;
}




function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let countryElement = document.querySelector("#country");
    countryElement.innerHTML = response.data.sys.country;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let maxElement = document.querySelector("#current-max");
    maxElement.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

    let minElement = document.querySelector("#current-min");
    minElement.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;

    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = (formatDate(response.data.dt * 1000));

    let mainIconElement = document.querySelector("#main-icon");
    mainIconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    mainIconElement.setAttribute("alt", response.data.weather[0].description);

    celsiusTemperature = response.data.main.temp;
    maxTemperature = response.data.main.temp_max;
    minTemperature = response.data.main.temp_min;
    feelsLikeTemperature = response.data.main.feels_like;
}


// city search 
function search(city){
    let apiKey = "7221c1b666843ec019546f9ad14749ae";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


function displayFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;

    let fahrenheitMaxTemperature = (maxTemperature * 9) / 5 + 32;
    let displayMaxTemperature = document.querySelector("#current-max");
    displayMaxTemperature.innerHTML = `${Math.round(fahrenheitMaxTemperature)}°F`;

    let fahrenheitMinTemperature = (minTemperature * 9) / 5 + 32;
    let displayMinTemperature = document.querySelector("#current-min");
    displayMinTemperature.innerHTML = `${Math.round(fahrenheitMinTemperature)}°F`;

    let fahrenheitFeelsLikeTemperature = (feelsLikeTemperature * 9) / 5 + 32;
    let displayFeelsLikeTemperature = document.querySelector("#feels-like");
    displayFeelsLikeTemperature.innerHTML = `${Math.round(fahrenheitFeelsLikeTemperature)}°F`;
}

function displayCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;

    let displayMaxTemperature = document.querySelector("#current-max");
    displayMaxTemperature.innerHTML = `${Math.round(maxTemperature)}°C`; 

    let displayMinTemperature = document.querySelector("#current-min");
    displayMinTemperature.innerHTML = `${Math.round(minTemperature)}°C`; 

    let displayFeelsLikeTemperature = document.querySelector("#feels-like");
    displayFeelsLikeTemperature.innerHTML = `${Math.round(feelsLikeTemperature)}°C`; 
}

//


    let celsiusTemperature = null;
    let maxTemperature = null;
    let minTemperature = null;
    let feelsLikeTemperature = null;

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);


    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheit);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsius);

