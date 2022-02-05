function displayTemperature(response) {
    console.log(response.data);
}

let apiKey = "7221c1b666843ec019546f9ad14749ae"
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=Perth&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayTemperature);