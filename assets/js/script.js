const apikey = "37a0c712794c529278a08367ad717f9d"
var currentWeatherEl = $("#current-weather");
var currentWeatherTitleEl = $("#current-weather-title");
var forecastEl = $("#daily-forecast");
var searchHistoryBtn = $("#search-btn");
var forecastTitle = $("#daily-forecast-title");
var searchHistory = [];


var getSeacrh = function() {
    var searched = localStorage.getItem("searchHistory");
    searched = JSON.parse(searched);
    for (x in searched) {
        searchHistory.push(searched[x]);
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("data-search", searched[x]);
        buttonEl.textContent = searched[x];
        buttonEl.className = "btn btn-dark m-2"
        searchHistoryBtn.append(buttonEl);
    }
}

// fetch weather data for specific city
var getLatLon = function(city) {

    // use current weather api to get latitude and longitude
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;

    //make a get request to url
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data.coord.lat, data.coord.lon, city);
                    searchHistory.push(city);
                    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                    $('#city').val('');
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Error: " + error)
        });
    // window.location.reload();

}

var displayWeather = function(lat, long, city) {

    // use latitude and longitude to get OneCall API (which gives us current weather, 5day forecast and UV Index)
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial" + "&appid=" + apikey;
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayData(data.current, city);
                    dailyForecast(data.daily);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Error: " + error)
        });
}

var displayData = function(dataObj, city) {
    $("#current-weather").html("");
    $("#current-weather-title").html("");
    // add name of the city + date (using moment.js)
    var cityTitle = document.createElement("h2");
    cityTitle.classList = ("m-5");
    cityTitle.textContent = city + " (" + moment().format("LL") + ")";
    currentWeatherTitleEl.append(cityTitle);

    // add weather icon
    var weatherImg = document.createElement("img");
    weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj.weather[0].icon + "@2x.png"
    currentWeatherTitleEl.append(weatherImg);

    //add temperature
    var temp = document.createElement("p");
    temp.textContent = ("Temp: " + dataObj.temp + " °F");
    currentWeatherEl.append(temp);

    //add wind
    var wind = document.createElement("p");
    wind.textContent = ("Wind: " + dataObj.wind_speed + " MPH");
    currentWeatherEl.append(wind);

    //add humidity
    var humidity = document.createElement("p");
    humidity.textContent = ("Humidity: " + dataObj.humidity + "%");
    currentWeatherEl.append(humidity);

    //add uv index
    var uvEl = document.createElement("div")
    uvEl.classList = ("uv-index");
    currentWeatherEl.append(uvEl);
    var uvIndex = document.createElement("p");
    uvIndex.textContent = ("UV Index: ");
    uvEl.append(uvIndex);
    var uvStatus = document.createElement("p");
    if (dataObj.uvi < 2) {
        uvStatus.id = "good-uvi"
    } else if (dataObj.uvi < 6 && dataObj.uvi > 2) {
        uvStatus.id = "regular-uvi"
    } else {
        uvStatus.id = "bad-uvi"
    }
    uvStatus.textContent = dataObj.uvi;
    uvEl.append(uvStatus);

}

var dailyForecast = function(dataObj) {
    $("#daily-forecast-title").html("");
    //add title
    var dailyForecastTitle = document.createElement("h2");
    dailyForecastTitle.textContent = ("5-Day Forecast:");
    forecastTitle.append(dailyForecastTitle);

    // add 5-day forecast
    $("#daily-forecast").html("");
    // First day card
    for (i = 0; i < 5; i++) {
        var day1 = document.createElement("div");
        day1.classList = "daily-container card w-100"
        forecastEl.append(day1);
        // add main container
        var firstDayCardContainer = document.createElement("div");
        firstDayCardContainer.classList = ("five-day-forecast");
        day1.append(firstDayCardContainer);
        // add title container
        var firstDayTitleContainer = document.createElement("div");
        firstDayTitleContainer.classList = ("d-flex align-items-center");
        firstDayCardContainer.append(firstDayTitleContainer);
        // add date
        var firstDayDate = document.createElement("h3");
        firstDayDate.classList = ("ms-3 mb-0")
        firstDayDate.textContent = (moment().add((i + 1), 'days').format("L"));
        firstDayTitleContainer.append(firstDayDate);
        // add weather icon
        var weatherImg = document.createElement("img");
        weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj[i].weather[0].icon + "@2x.png"
        weatherImg.classList = ("daily-forecast-img")
        firstDayTitleContainer.append(weatherImg);
        // add brake
        var brake = document.createElement("br");
        day1.append(brake);
        // add temp
        var temp = document.createElement("p");
        temp.textContent = ("Temp: " + dataObj[i].temp.day + " °F");
        day1.append(temp);
        // add wind
        var wind = document.createElement("p");
        wind.textContent = ("Wind: " + dataObj[i].wind_speed + " MPH");
        day1.append(wind);
        //add humidity
        var humidity = document.createElement("p");
        humidity.textContent = ("Humidity: " + dataObj[i].humidity + "%");
        day1.append(humidity);

    }
}

var clearHistory = function() {
    localStorage.clear();
    location.reload();
}

// start 🚀
$(document).on('click', '.btn', function() {
    var city = $("#city").val();
    if (city === null || city === "") {
        city = $(this).attr('data-search');
    }
    getLatLon(city);
});

getSeacrh();