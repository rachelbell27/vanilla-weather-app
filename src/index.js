let key = "d2e2c79fc9c89249abd1e2c823668949";
let units = "imperial";
let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
let ocApiRoot = "https://api.openweathermap.org/data/2.5/onecall?";
let displayTemp = document.querySelector("#temperature-element");
let displayCity = document.querySelector("#city-element");
let displayCountry = document.querySelector("#country-element");
let displayDate = document.querySelector("#date-time-element");
let displaySky = document.querySelector("#sky-element");
let displayHumidity = document.querySelector("#humidity-element");
let displayWind = document.querySelector("#wind-element");
let searchForm = document.querySelector("#search-form");
let displayImage = document.querySelector("#weather-icon");
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let temp = 13;
let lat = 40.7143;
let lon = -74.006;

function formatDate(now) {
  let weekDay = days[now.getDay()];
  let hour = now.getHours();
  let type = "am";
  if (hour >= 12) {
    hour = hour - 12;
    type = "pm";
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  return `${weekDay}, ${hour}:${minute}${type}`;
}

function formatDay(dt) {
  let date = new Date(dt * 1000);
  let day = date.getDay();
  return days[day];
}

function handleForecast(response) {
  let dayResponse = response.data.daily;
  let displayForecast = document.querySelector("#forecast");
  let forecastHTML = `<hr /> <div class="row">`;

  dayResponse.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `          
        <div class="col-2">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div>
              <span class="forecast-temp-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>
              <span class="forecast-temp-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  console.log(forecastHTML);
  displayForecast.innerHTML = forecastHTML;
}

function getForecast() {
  let forecastApiUrl = `${ocApiRoot}units=${units}&lat=${lat}&lon=${lon}&appid=${key}`;
  axios.get(forecastApiUrl).then(handleForecast);
}

function handleWeather(response) {
  console.log(response);
  temp = Math.round(response.data.main.temp);
  lat = response.data.coord.lat;
  lon = response.data.coord.lon;
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let imageResponse = response.data.weather[0].icon;
  let skyResponse = response.data.weather[0].description;
  let imgURL = `https://openweathermap.org/img/wn/${imageResponse}@2x.png`;
  displayDate.innerHTML = formatDate(new Date());
  displayTemp.innerHTML = temp;
  displayCity.innerHTML = cityName;
  displayCountry.innerHTML = countryName;
  displayHumidity.innerHTML = humidity;
  displayWind.innerHTML = windSpeed;
  displayImage.setAttribute("src", imgURL);
  displaySky.innerHTML = skyResponse;
  getForecast();
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
