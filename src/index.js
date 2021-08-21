let key = "d2e2c79fc9c89249abd1e2c823668949";
let units = "metric";
let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
let displayTemp = document.querySelector("#temperature-element");
let displayCity = document.querySelector("#city-element");
let displayCountry = document.querySelector("#country-element");
let displayDate = document.querySelector("#date-time-element");
let displaySky = document.querySelector("#sky-element");
let displayHumidity = document.querySelector("#humidity-element");
let displayWind = document.querySelector("#wind-element");
let searchForm = document.querySelector("#search-form");
let displayImage = document.querySelector("#weather-icon");
let celsiusSelector = document.querySelector("#celsius-temperature");
let fahrenheitSelector = document.getElementById("fahrenheit-temperature");
let celsiusTemp = 13;

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[now.getDay()];
  let hour = now.getHours();
  if (now.getHours() < 10) {
    hour = "0" + now.getHours();
  }
  let minute = now.getMinutes();
  if (now.getMinutes() < 10) {
    minute = "0" + now.getMinutes();
  }
  return `${weekDay}, ${hour}:${minute}`;
}
function calculateFahrenheit(event) {
  event.preventDefault();
  celsiusSelector.classList.remove("active");
  fahrenheitSelector.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  displayTemp.innerHTML = fahrenheitTemp;
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheitSelector.classList.remove("active");
  celsiusSelector.classList.add("active");
  displayTemp.innerHTML = celsiusTemp;
}

function handleWeather(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let imageResponse = response.data.weather[0].icon;
  let skyResponse = response.data.weather[0].description;
  let imgURL = `https://openweathermap.org/img/wn/${imageResponse}@2x.png`;
  celsiusSelector.click();
  displayDate.innerHTML = formatDate(new Date());
  displayTemp.innerHTML = celsiusTemp;
  displayCity.innerHTML = cityName;
  displayCountry.innerHTML = countryName;
  displayHumidity.innerHTML = humidity;
  displayWind.innerHTML = windSpeed;
  displayImage.setAttribute("src", imgURL);
  displaySky.innerHTML = skyResponse;
}

function handleSearch(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-input");
  getWeather(searchCity.value);
}

function getWeather(city) {
  axios
    .get(`${apiRoot}units=${units}&q=${city}&appid=${key}`)
    .then(handleWeather);
}

getWeather("New York");
searchForm.addEventListener("submit", handleSearch);
fahrenheitSelector.addEventListener("click", calculateFahrenheit);
celsiusSelector.addEventListener("click", displayCelsius);
