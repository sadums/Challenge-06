/* API CALLS */ 
var API_KEY = "f958d5799c0e9323c09bec4b41b7efee";
var limit = 1;
var cityName = null;

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

var addToHistory = function(searchText){
    // store to local storage
    var historyArray = JSON.parse(localStorage.getItem("searchHistory"));
    historyArray.push(searchText);
    localStorage.setItem("searchHistory", JSON.stringify(historyArray));

    // add as an element to page
    var searchCard = document.createElement("button");
    searchCard.innerHTML = `
    <div class="card-body p-1 text-center" id="${searchText}">
        <h4 class="card-title" id="${searchText}">${searchText}</h4>
    </div>
    `;
    searchCard.setAttribute("id", searchText);
    searchCard.setAttribute("class", "card text-white bg-secondary p-0 my-2 w-100 align-items-center");
    searchHistory.append(searchCard);

    searchCard.addEventListener("click", search);
}

var search = function(event){
    var enteredCity;
    if(event.target.getAttribute('id') === 'searchButton' && searchText.value){
        enteredCity = searchText.value;
        addToHistory(enteredCity);
        searchText.value = "";
    }else if(event.target.id != 'searchButton'){
        enteredCity = event.target.id;
    }
    if(enteredCity){
        console.log("testing")
    }
}

searchButton.addEventListener("click", search);


// Set search history array if it is not made
if(localStorage.getItem("searchHistory")){
    localStorage.setItem("searchHistory", JSON.stringify([]));
}