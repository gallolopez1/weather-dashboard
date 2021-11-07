const apikey = "37a0c712794c529278a08367ad717f9d"
var currentWeatherEl = $("#current-weather");
var currentWeatherTitleEl = $("#current-weather-title");
var forecastEl = $("#daily-forecast");

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

var displayData = function(dataObj) {

    // add name of the city + date (using moment.js)
    var cityTitle = document.createElement("h2");
    cityTitle.classList = ("m-5");
    cityTitle.textContent = $("#city").val() + " (" + moment().format("LL") + ")";
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
    // add 5-day forecast

    // First day card
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
    firstDayDate.textContent = (moment().add(1, 'days').format("L"));
    firstDayTitleContainer.append(firstDayDate);
    // add weather icon
    var weatherImg = document.createElement("img");
    weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj[1].weather[0].icon + "@2x.png"
    weatherImg.classList = ("daily-forecast-img")
    firstDayTitleContainer.append(weatherImg);
    // add brake
    var brake = document.createElement("br");
    day1.append(brake);
    // add temp
    var temp = document.createElement("p");
    temp.textContent = ("Temp: " + dataObj[1].temp.day + " °F");
    day1.append(temp);
    // add wind
    var wind = document.createElement("p");
    wind.textContent = ("Wind: " + dataObj[1].wind_speed + " MPH");
    day1.append(wind);
    //add humidity
    var humidity = document.createElement("p");
    humidity.textContent = ("Humidity: " + dataObj[1].humidity + "%");
    day1.append(humidity);

    // Second day card
    var day2 = document.createElement("div");
    day2.classList = "daily-container card w-100"
    forecastEl.append(day2);
    // add main container
    var secondDayCardContainer = document.createElement("div");
    secondDayCardContainer.classList = ("five-day-forecast");
    day2.append(secondDayCardContainer);
    // add title container
    var secondDayTitleContainer = document.createElement("div");
    secondDayTitleContainer.classList = ("d-flex align-items-center");
    secondDayCardContainer.append(secondDayTitleContainer);
    // add date
    var secondDayDate = document.createElement("h3");
    secondDayDate.classList = ("ms-3 mb-0")
    secondDayDate.textContent = (moment().add(2, 'days').format("L"));
    secondDayTitleContainer.append(secondDayDate);
    // add weather icon
    var weatherImg = document.createElement("img");
    weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj[2].weather[0].icon + "@2x.png"
    weatherImg.classList = ("daily-forecast-img")
    secondDayTitleContainer.append(weatherImg);
    // add brake
    var brake = document.createElement("br");
    day2.append(brake);
    // add temp
    var temp = document.createElement("p");
    temp.textContent = ("Temp: " + dataObj[2].temp.day + " °F");
    day2.append(temp);
    // add wind
    var wind = document.createElement("p");
    wind.textContent = ("Wind: " + dataObj[2].wind_speed + " MPH");
    day2.append(wind);
    //add humidity
    var humidity = document.createElement("p");
    humidity.textContent = ("Humidity: " + dataObj[2].humidity + "%");
    day2.append(humidity);

    // Third day card
    var day3 = document.createElement("div");
    day3.classList = "daily-container card w-100"
    forecastEl.append(day3);
    // add main container
    var thirdDayCardContainer = document.createElement("div");
    thirdDayCardContainer.classList = ("five-day-forecast");
    day3.append(thirdDayCardContainer);
    // add title container
    var thirdDayTitleContainer = document.createElement("div");
    thirdDayTitleContainer.classList = ("d-flex align-items-center");
    thirdDayCardContainer.append(thirdDayTitleContainer);
    // add date
    var thirdDayDate = document.createElement("h3");
    thirdDayDate.classList = ("ms-3 mb-0")
    thirdDayDate.textContent = (moment().add(3, 'days').format("L"));
    thirdDayTitleContainer.append(thirdDayDate);
    // add weather icon
    var weatherImg = document.createElement("img");
    weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj[3].weather[0].icon + "@2x.png"
    weatherImg.classList = ("daily-forecast-img")
    thirdDayTitleContainer.append(weatherImg);
    // add brake
    var brake = document.createElement("br");
    day3.append(brake);
    // add temp
    var temp = document.createElement("p");
    temp.textContent = ("Temp: " + dataObj[3].temp.day + " °F");
    day3.append(temp);
    // add wind
    var wind = document.createElement("p");
    wind.textContent = ("Wind: " + dataObj[3].wind_speed + " MPH");
    day3.append(wind);
    //add humidity
    var humidity = document.createElement("p");
    humidity.textContent = ("Humidity: " + dataObj[3].humidity + "%");
    day3.append(humidity);

    // Fourth day card
    var day4 = document.createElement("div");
    day4.classList = "daily-container card w-100"
    forecastEl.append(day4);
    // add main container
    var fourthDayCardContainer = document.createElement("div");
    fourthDayCardContainer.classList = ("five-day-forecast");
    day4.append(fourthDayCardContainer);
    // add title container
    var fourthDayTitleContainer = document.createElement("div");
    fourthDayTitleContainer.classList = ("d-flex align-items-center");
    fourthDayCardContainer.append(fourthDayTitleContainer);
    // add date
    var fourthDayDate = document.createElement("h3");
    fourthDayDate.classList = ("ms-3 mb-0")
    fourthDayDate.textContent = (moment().add(4, 'days').format("L"));
    fourthDayTitleContainer.append(fourthDayDate);
    // add weather icon
    var weatherImg = document.createElement("img");
    weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj[4].weather[0].icon + "@2x.png"
    weatherImg.classList = ("daily-forecast-img")
    fourthDayTitleContainer.append(weatherImg);
    // add brake
    var brake = document.createElement("br");
    day4.append(brake);
    // add temp
    var temp = document.createElement("p");
    temp.textContent = ("Temp: " + dataObj[4].temp.day + " °F");
    day4.append(temp);
    // add wind
    var wind = document.createElement("p");
    wind.textContent = ("Wind: " + dataObj[4].wind_speed + " MPH");
    day4.append(wind);
    //add humidity
    var humidity = document.createElement("p");
    humidity.textContent = ("Humidity: " + dataObj[4].humidity + "%");
    day4.append(humidity);

    // Fifth day card
    var day5 = document.createElement("div");
    day5.classList = "daily-container card w-100"
    forecastEl.append(day5);
    // add main container
    var fifthDayCardContainer = document.createElement("div");
    fifthDayCardContainer.classList = ("five-day-forecast");
    day5.append(fifthDayCardContainer);
    // add title container
    var fifthDayTitleContainer = document.createElement("div");
    fifthDayTitleContainer.classList = ("d-flex align-items-center");
    fifthDayCardContainer.append(fifthDayTitleContainer);
    // add date
    var fifthDayDate = document.createElement("h3");
    fifthDayDate.classList = ("ms-3 mb-0")
    fifthDayDate.textContent = (moment().add(5, 'days').format("L"));
    fifthDayTitleContainer.append(fifthDayDate);
    // add weather icon
    var weatherImg = document.createElement("img");
    weatherImg.src = "http://openweathermap.org/img/wn/" + dataObj[5].weather[0].icon + "@2x.png"
    weatherImg.classList = ("daily-forecast-img")
    fifthDayTitleContainer.append(weatherImg);
    // add brake
    var brake = document.createElement("br");
    day5.append(brake);
    // add temp
    var temp = document.createElement("p");
    temp.textContent = ("Temp: " + dataObj[5].temp.day + " °F");
    day5.append(temp);
    // add wind
    var wind = document.createElement("p");
    wind.textContent = ("Wind: " + dataObj[5].wind_speed + " MPH");
    day5.append(wind);
    //add humidity
    var humidity = document.createElement("p");
    humidity.textContent = ("Humidity: " + dataObj[5].humidity + "%");
    day5.append(humidity);
}

// start 🚀
$('.btn').on('click', getLatLon);