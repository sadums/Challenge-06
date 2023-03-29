var API_KEY = "f958d5799c0e9323c09bec4b41b7efee";
var limit = 1;
var cityName = "London"

var geocodingRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`;

var getCity = function(){
    fetch(geocodingRequestURL)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var latitude = 51.5085;
var longitude = -0.1257;

var weatherRequestURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

var getWeather = function(){
    fetch(weatherRequestURL)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}