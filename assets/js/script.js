const apikey = "37a0c712794c529278a08367ad717f9d"
var currentWeatherEl = $("#current-weather");
var currentWeatherTitleEl = $("#current-weather-title");

// fetch weather data for specific city
var getLatLon = function() {

    var city = $("#city").val();
    // use current weather api to get latitude and longitude
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;

    //make a get request to url
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data.coord.lat, data.coord.lon);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Error: " + error)
        });

}

var displayWeather = function(lat, long) {

    // use latitude and longitude to get OneCall API (which gives us current weather, 5day forecast and UV Index)
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial" + "&appid=" + apikey;
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayData(data.current);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Error: " + error)
        });
}

var displayData = function(dataObj) {
    // var weatherImg = document.createElement("img");
    // weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj.weather[0].icon + "@2x.png"
    // weatherImg.setAttribute("width", "100px;", "length", "100px");

    // add name of the city + date (using moment.js)
    var cityTitle = document.createElement("h2");
    cityTitle.classList = ("m-5");
    cityTitle.textContent = $("#city").val() + " (" + moment().format("LL") + ")";
    currentWeatherTitleEl.append(cityTitle);

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

// start 🚀
$('.btn').on('click', getLatLon);