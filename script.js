//api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid=adcc3ff97d958d3bb952ad0d411c038b
const api = {
  key: "adcc3ff97d958d3bb952ad0d411c038b",
  url: "http://api.openweathermap.org/data/2.5/",
}
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getForecast(searchbox.value);
  }
}

function getForecast (query) {
  var url = api.baseurl + "forecast?q=" + query + "&units=metric&APPID=" + api.key;
  fetch(url).then(response => response.json()).then(data=>processForecast(data));
}


function getUvi (lat, lon) {
  var url = api.baseurl + "uvi/forecast?lat=" + lat + "&lon=" + lon + "&cont=40&appid=" + api.key;
  fetch(url).then(response => response.json()).then(data=>processForecast(data));
}


function processForecast (forecast) {
  var coord = forecast.city.coord;
  var city = forecast.city.name;
  var list = forecast.list;
  for (var i = 0; i < list.length; i += 8) {
    var record = list[i];
    var date = record.dt_txt;
    var temp = record.main.temp;
    var humidity = record.main.humidity;
    var icon = record.weather[0].icon;
    var speed = record.wind.speed;
  }

  TO DO GET UVI
//  let city = document.querySelector(".location .city");
// city.innerText = `${forecast.name}, ${forecast.sys.country}`;
  console.log(forecast);
//  let now = new Date();
//  let date = document.querySelector(".location .date");
//  date.innerText = dateBuilder(now);

//  let temp = document.querySelector(".current .temp");
//  temp.innerHTML = `${Math.round(forecast.main.temp)}<span>°c</span>`;

//  let weather_el = document.querySelector(".current .forecast");
//  weather_el.innerText = forecast.forecast[0].main;

//  let hilow = document.querySelector(".hi-low");
//  hilow.innerText = `${Math.round(forecast.main.temp_min)}°c / ${Math.round(forecast.main.temp_max)}°c`;
}
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}