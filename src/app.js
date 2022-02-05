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
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let countryElement = document.querySelector("#country");
    countryElement.innerHTML = response.data.sys.country;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let maxElement = document.querySelector("#current-max");
    maxElement.innerHTML = Math.round(response.data.main.temp_max);

    let minElement = document.querySelector("#current-min");
    minElement.innerHTML = Math.round(response.data.main.temp_min);

    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = (formatDate(response.data.dt * 1000));

    let mainIconElement = document.querySelector("#main-icon");
    mainIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    mainIconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "7221c1b666843ec019546f9ad14749ae"
let city = "london"
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);