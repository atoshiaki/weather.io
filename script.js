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

//Uses API to get current and future weather info
function getForecast (query) {
  var url = api.url + "forecast?q=" + query + "&units=imperial&APPID=" + api.key;
  fetch(url)
    .then(response => response.json())
    .then(data=>processForecast(data));
}
//Uses API to get Uvi information using the info from the forcast response
function getUvi (lat, lon) {
  var url = api.url + "uvi/forecast?lat=" + lat + "&lon=" + lon + "&cont=40&appid=" + api.key;
  fetch(url).then(response => response.json()).then(data=>processForecast(data));
}

function processForecast (forecast) {
  var city = forecast.city.name;
  var list = forecast.list;
  //change name city off search
  $('.location .city [name="name"]').html(city)
  for (var i = 0; i < list.length; i += 8) {
    var record = list[i];
    var date = record.dt_txt.substring(0, record.dt_txt.indexOf(' '));
    var temp = record.main.temp;
    var humidity = record.main.humidity;
    var icon = record.weather[0].icon;
    var speed = record.wind.speed;

    $('.' + i + 'record .date [name="date"]').html(date);
    $('.' + i + 'record .temp [name="temp"]').html(temp);
    $('.' + i + 'record .weather [name="icon"]').html(icon);
    $('.' + i + 'record .humidity [name="humidity"]').html(humidity);
    $('.' + i + 'record .wind [name="wind"]').html(speed);
    
    console.log(forecast);
  }
}