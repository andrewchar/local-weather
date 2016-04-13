$(document).ready(function() {

    var updateWeather;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=80f8b2429407d4784a3e920826f54555', function(json) {
                updateWeather = json;
                presentWeather();
                weatherIcon();
            });
        });
    }

    function presentWeather() {
        $("#myLocation").append(updateWeather.name);
        $("#myLocation").append(", " + updateWeather.sys.country);
        $("#myTemp").append((updateWeather.main.temp).toFixed(1) + "°C");
        $("#descript").text(updateWeather.weather[0].description);
    }

    function weatherIcon() {
        var icon = updateWeather.weather[0].icon;
        $("#icon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
    }


    $("#convertBtnF").click(function() {
        var farValue = (updateWeather.main.temp * (9 / 5) + 32);
        $("#myTemp").text("Temp: " + (farValue).toFixed(1) + "°F");
    })


    $("#convertBtnC").click(function() {
        $("#myTemp").text("Temp: " + (updateWeather.main.temp).toFixed(1) + "°C");
    })

});