const apikey = "37a0c712794c529278a08367ad717f9d"

// fetch weather data for specific city
var getLatLon = function() {

    var city = $("#city").val();
    // format the weather api
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
    // latitude and longitude

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

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apikey;
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Error: " + error)
        });
}


// start 🚀
$('.btn').on('click', getLatLon);