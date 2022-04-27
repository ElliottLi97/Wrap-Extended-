let searchInputEl = document.querySelector('#search');
let searchBtnEl = document.querySelector('#searchBtn');

function initMap() {
    var options = {
        zoom: 8,
        center: {lat:32.715736, lng: -117.161087}
    }
    var map = new google.maps.Map(document.querySelector('#map'), options)
}

//OpenWeatherMap API for getting lat and lng key: c5b139c965624904b3f9c5610ccae3be 
//store the city the user searches into local
var searchHistoryArr = JSON.parse(localStorage.getItem('searchHistory')) || []; 
searchBtnEl.addEventListener('click', startSearch) //when blue search button get clicked, 

//Begins are search when user clicks any button in the searchWrap element
function startSearch() {
  let inputText = searchInputEl.value.toLowerCase().split(' '); //this turns the users entered text into title case 
  for (let i=0; i<inputText.length;i++){
      inputText[i] = inputText[i].charAt(0).toUpperCase() + inputText[i].slice(1);
  }
  let city = inputText.join(' ');
  //link to geocoding API with the city value that was chosen above as a parameter 
  let locationRequestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city ? city : 'San Diego'}&limit=1&appid=ce8a9858dadfcfb05f86b5d9eedb659d`
  searchInputEl.value = ''; //clears text in text area 
  getGeoCord(locationRequestUrl);
}

//take the most current city that the user searches and obtain the lat and long of city
function getGeoCord(requestUrl) {
    fetch(requestUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        let cityName = data[0].name; //gets the first city returned in search from API
        if (searchHistoryArr.indexOf(cityName) < 0 && data.length > 0) { //this makes sure there are no repeated citys in search history 
            searchHistoryArr.push(cityName);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
            addBtn();
        }
        let lat = data[0].lat;  //gets the latitude and longitude of the city returned by API
        let lon = data[0].lon;
        //Adds the lat and lon values to weather API url so we can find the weather in the city we are searching for
        
        //need to send the lat and lon cord to crimeometer API
    })
}



// Crime Data API key: gpuXbzy7VI8nN51pmvGzSPPYl1TeGQa16HiOiSn5 We're only limited to 100 calls on this key
var lat = "33.1434" //xx.yyyy
var lon = "-117.1661"
var distance = "5mi" // Xunits unit types: mi yd ft km m 
var datetime_ini = "2022-01-01 00:00:00" // yyyy-MM-dd'T'HH: mm: ss.SSS'Z or YYYY-MM-DD HH:mm:ss
var datetime_end = "2022-04-25 00:00:00"

var request = new XMLHttpRequest();

request.open('GET', 'https://api.crimeometer.com/v1/incidents/raw-data?lat='+lat+'&lon='+lon+'&distance='+distance+'&datetime_ini='+datetime_ini+'&datetime_end='+datetime_end+'&page=1');

request.setRequestHeader('Content-Type', 'object');
request.setRequestHeader('x-api-key', 'gpuXbzy7VI8nN51pmvGzSPPYl1TeGQa16HiOiSn5');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
    console.log(JSON.parse(this.responseText))
  }
};

//request.send(); 