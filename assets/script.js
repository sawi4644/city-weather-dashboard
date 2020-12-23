// Get an API Key from OpenWeatherMap API
var apiKey = '0b569f610d7ec3bee422760c10d3c145'

// var queryUrl_Cord= 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=1ea2723652fb48157c3662902e2f935d'


function citySearch(cityName) {
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid' + apiKey
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (weatherData) {
    console.log(weatherData)
    // $('.city').text("City: " + weatherData.name)
    // $('.wind').text("wind speed: " + weatherData.wind.speed)
    // $('.humidity').text("humidity: " + weatherData.main.humidity)
    // $('.temp').text("temperature: " + weatherData.main.temp)
  })
}

$('#search-button').click(function () {
  citySearch($('#city-input').val())
  // Search city when search button is clicked 

  // local storage & history
  var cityAr= localStorage.getItem('history')
  if(cityAr === null){
    cityAr=[]
  }
  cityAr.push($('#city-input').val())
  localStorage.setItem('history', cityAr)
  

//   function search(event) {
//     event.preventDefault();
//     cityInput = $('#search-input').val().trim();
//     if (cityInput !== '') {
//       searchCity = cityInput;
//       getWeather(searchCity);
    // }
//   }
})

//match array with buttons on html
// get item from local storage and loop through



// WHEN I search for a city- button on click function
// THEN I am presented with current and future conditions for that city and that city is added to the search history- after api call and display information- store city-search in local storage


// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index- appending the information to the current day index- 


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe- second api call for UV index- uses lat & long- use some data from first call to assist in second api data call


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
function buildCards(){
  for (i=0; i<5; i++){
    var card= $('<div>').addClass('card')
    var header= $('<h1>')
    header.text(i)
    card.append(header)
    $('#5day').append(card)
  }
}
buildCards()


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city-- go through local storage and make button for each previously searched city- button on click function- grab value from the button



// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast-- as part of broswer loading- grab last city from local storage and display on screen. 