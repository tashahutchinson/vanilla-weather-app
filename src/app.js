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


function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return days[day];
}



function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class="row forecast-box"><div class="col-4"> <span class="forecast-day">${formatDay(forecastDay.dt)}</span></div>
        <div class="col-3 text-center"> <span class="forecast-high">${Math.round(forecastDay.temp.max)}°C</span></div>
        <div class="col-3"><span class="forecast-low">${Math.round(forecastDay.temp.min)}°C</span></div>
        <div class="col-2 text-center"><img class="forecast-icon" src="images/${forecastDay.weather[0].main}.svg" alt="sunny"></div>
        </div>`;
    }

    });

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){ 
    let apiKey = "7221c1b666843ec019546f9ad14749ae";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
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
    let weatherName = response.data.weather[0].main;
    mainIconElement.setAttribute(
      "src",
      `images/${weatherName}.svg`
    );
    mainIconElement.setAttribute("alt", response.data.weather[0].main);

    celsiusTemperature = response.data.main.temp;
    maxTemperature = response.data.main.temp_max;
    minTemperature = response.data.main.temp_min;
    feelsLikeTemperature = response.data.main.feels_like;

    getForecast(response.data.coord);

}




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



function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7221c1b666843ec019546f9ad14749ae";
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
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


search("Perth");

    let celsiusTemperature = null;
    let maxTemperature = null;
    let minTemperature = null;
    let feelsLikeTemperature = null;



    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);


    let button = document.querySelector("#location-button");
    button.addEventListener("click", getLocation);


    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheit);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsius);

    

