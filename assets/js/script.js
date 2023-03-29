/* API CALLS */ 
var API_KEY = "f958d5799c0e9323c09bec4b41b7efee";
var limit = 1;
var cityName;

var geocodingRequestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`;

var getCity = function(){
    fetch(geocodingRequestURL)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var latitude;
var longitude;

var weatherRequestURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

var getWeather = function(){
    fetch(weatherRequestURL)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


/* SEARCH FOR CITY */ 
var searchText = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');
var searchHistory = document.getElementById('searchHistory');

var addToHistory = function(search){
    var searchCard = document.createElement("div");
    searchCard.innerHTML = `
    <div class="card text-white bg-secondary p-0 my-2">
        <div class="card-body p-1 text-center">
            <h4 class="card-title">${search}</h4>
        </div>
    </div>
    `;
    searchCard.setAttribute("id", search);

    searchHistory.append(searchCard);
}

var search = function(event){
    addToHistory(searchText.value);
}

searchButton.addEventListener("click", search);