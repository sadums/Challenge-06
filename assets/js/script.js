/* API CALLS */ 
var API_KEY = "f958d5799c0e9323c09bec4b41b7efee";
var limit = 1;
var cityName;

var weatherReports = document.getElementById('weatherReports');
let searchSection = document.getElementById('search');

var weatherReportTitle = document.getElementById("weatherReport").children[0].children[0];
var weatherReportBody = document.getElementById("weatherReport").children[0].children[1];

var fiveDayReportElement = document.getElementById('5dayWeatherReport').children[0];
var dayReportArray = [];

for(var i = 0; i < fiveDayReportElement.children.length; i++){
    var dayReport = fiveDayReportElement.children[i].children[0].children[0];
    dayReportArray.push(dayReport);
}

var geocodingRequestURL;

var getCity = function(cityName1){
    fetch(geocodingRequestURL)
    .then(response => response.json())
    .then(function(result){
        if(result != undefined){
            latitude = result[0].lat;
            longitude = result[0].lon;
            getWeather(result[0].lat, result[0].lon, cityName1);
        }
    })
    .catch(error => console.log('error', error));
}

var latitude;
var longitude;

var weatherObject;

var getWeather = function(lat1, lon1, cityName1){
    var weatherRequestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon1}&appid=${API_KEY}&units=imperial`;
    fetch(weatherRequestURL)
    .then(response => response.json())
    .then(function(result){
        for(var i = 0; i < dayReportArray.length; i++){
            var title = dayReportArray[i].children[0];
            var body = dayReportArray[i].children[1];
            var day = i * 8 + 4;
            
            var date = result.list[day].dt_txt.split(" ")[0].split("-")[1] + "/" + result.list[day].dt_txt.split(" ")[0].split("-")[2]
            var temp = result.list[day].main.temp;
            var humidity = result.list[day].main.humidity;
            var wind = result.list[day].wind.speed;
            var icon = result.list[day].weather[0].icon;
            var iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`
            title.innerHTML = date + "<img src=" + iconSrc + "></img>";
            body.innerHTML = `Temp: ${temp} <br>Humidity: ${humidity}  <br>Wind: ${wind} MPH`;
            if(i === 0){
                weatherReportTitle.innerHTML = cityName1 + " " + date + "<img src=" + iconSrc + "></img>";
                weatherReportBody.innerHTML = `Temp: ${temp} <br>Humidity: ${humidity}  <br>Wind: ${wind} MPH`;
            }
        }
        searchSection.setAttribute('class', "col-lg-2");
        weatherReports.setAttribute('style', 'display: block;');
    })
    .catch(error => console.log('error', error));
}


/* SEARCH FOR CITY */ 
var searchText = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');
var searchHistory = document.getElementById('searchHistory');

var addToHistory = function(searchText){
    // store to local storage
    if(localStorage.getItem("searchHistory") != null && localStorage.getItem("searchHistory") != undefined){
        var historyArray = JSON.parse(localStorage.getItem("searchHistory"));
    }else{
        var historyArray = [];
    }
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
    searchHistory.prepend(searchCard);

    searchCard.addEventListener("click", search);

    // limit search history to five
    if(searchHistory.children.length > 5){
        searchHistory.children[5].remove();
    }
}

var search = function(event){
    if(event.target.getAttribute('id') === 'searchButton' && searchText.value){
        cityName = searchText.value;
        addToHistory(cityName);
        searchText.value = "";
    }else if(event.target.id != 'searchButton'){
        cityName = event.target.id;
    }
    if(cityName){
        geocodingRequestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`;
        getCity(cityName);
    }
}

searchButton.addEventListener("click", search);

// Set search history array if it is not made
if(!localStorage.getItem("searchHistory")){
    localStorage.setItem("searchHistory", JSON.stringify([]));
}
if(localStorage.getItem(("searchHistory"))){
    let historyArray = JSON.parse(localStorage.getItem("searchHistory"));
    for(let i = 0; i < historyArray.length; i++){
        let searchText = historyArray[i];
        let searchCard = document.createElement("button");
        searchCard.innerHTML = `
        <div class="card-body p-1 text-center" id="${searchText}">
            <h4 class="card-title" id="${searchText}">${searchText}</h4>
        </div>
        `;
        searchCard.setAttribute("id", searchText);
        searchCard.setAttribute("class", "card text-white bg-secondary p-0 my-2 w-100 align-items-center");
        searchHistory.prepend(searchCard);
    
        searchCard.addEventListener("click", search);
    
        // limit search history to five
        if(searchHistory.children.length > 5){
            searchHistory.children[5].remove();
        }
    }
}