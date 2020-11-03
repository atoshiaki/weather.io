$$(document).ready(function(){
  if(window.localStorage.getItem("locations")!=null){
    renderList();
    var oldLocations = JSON.parse(window.localStorage.getItem("locations"))||[];
    length = oldLocations.length;
    console.log(oldLocations)
    ajaxCall1(oldLocations[length-1])
  }
  $(".list-group-item").on("click",function(){
    ajaxCall1($(this).text());
  });
  $("#searchBtn").on("click",function(event){
    event.preventDefault();
    var oldLocations = JSON.parse(window.localStorage.getItem("locations"))||[];
    var newLocation = ($(this)[0].previousSibling.previousSibling.value);
    $("#searchInput").val("");
    oldLocations.push(newLocation);
    window.localStorage.setItem('locations',JSON.stringify(oldLocations));
    addListItem(newLocation);
    ajaxCall1(newLocation);
  });
  function ajaxCall1(loc){
    var APIKey = "51a572fe119541b7968327efa5179ffc";
    var queryURL = "https://api.opencagedata.com/geocode/v1/json?q="+loc+"&key="+ 
    APIKey 
    + "&language=en&pretty=1";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    ajaxCall2(loc,response.results[0].geometry.lat,response.results[0].geometry.lng)
    });
  }
  function ajaxCall2(loc,lat,lng){
    var APIKey = "d97ff29f74f4ffb3674d8de47004be2a";
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?"+"lat="+ lat + "&lon="+ lng +
    "&exclude={minute,hourly}&appid="+APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var icon = response.current.weather[0].icon;
      var date =moment.unix(response.current.dt).format("ddd M/DD") ;
      $("#city").html(`<h1>${loc}</h1>`);
      $("#date").html(`<h5>${date}</h5>`);
      $("#wind").text(`Wind Speed: ${response.current.wind_speed}`);
      $("#humidity").text("Humidity: " + response.current.humidity);
      $("#uvIndex").html(`UV Index: <span class="badge badge-secondary">${response.current.uvi}</span>`);
      uviColor(response.current.uvi)
      $("#currentIcon").attr("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)
      var tempF = (response.current.temp - 273.15) * 1.80 + 32;
      $("#tempF").text("Temperature (F) " + tempF.toFixed(2));
      dailyWeather = response.daily;
      clearForecast(dailyWeather);
      dailyWeather.forEach((element,i) => {
        var date =moment.unix(element.dt).format("ddd M/DD") ;
        var icon = element.weather[0].icon;
        var maxTemp = (element.temp.max- 273.15) * 1.80 + 32;
        var minTemp = (element.temp.min- 273.15) * 1.80 + 32;
        var humidity = element.humidity;
        $(`#day${i+1}`).attr("src",`http://openweathermap.org/img/wn/${icon}@2x.png`)
        $(`#day${i+1}`).siblings(".card-body").append(`<h5 class="card-title">${date}</h5>`)
        $(`#day${i+1}`).siblings(".card-body").append(`<p class="card-text">Max Temp(F): ${maxTemp.toFixed(2)}</p>`)
        $(`#day${i+1}`).siblings(".card-body").append(`<p class="card-text">Min Temp(F): ${minTemp.toFixed(2)}</p>`)
        $(`#day${i+1}`).siblings(".card-body").append(`<p class="card-text">Humidity: ${humidity}</p>`)
      });
    });
  }
  function renderList(){
    var searchHist = JSON.parse(window.localStorage.getItem("locations"));
    $(".list-group").empty();
    searchHist.forEach(element => {
      $(".list-group").prepend(`<li class="list-group-item">${element}</li>`)
    });
  }
  function addListItem(loc){
    $(".list-group").prepend(`<li class="list-group-item">${loc}</li>`)
  }
  function uviColor(uvi){
    if(0<uvi && uvi<3){
      $(".badge").attr("style","background-color:#a0ce00")
    }
    else if(3<=uvi && uvi<6){
      $(".badge").attr("style","background-color:#f8b600")
    }
    else if(6<=uvi && uvi<8){
      $(".badge").attr("style","background-color:#f85900")
    }
    else if(8<=uvi && uvi<11){
      $(".badge").attr("style","background-color:#d8001d")
    }
    else{
      $(".badge").attr("style","background-color:#b54cff")
    }
  }
  function clearForecast(array){
    array.forEach((element,i) => {
      $(`#day${i+1}`).siblings(".card-body").empty();
      $(`#day${i+1}`).siblings(".card-body").empty();
      $(`#day${i+1}`).siblings(".card-body").empty();
      $(`#day${i+1}`).siblings(".card-body").empty();
    });
  }
});