// instructions 
// Get an API Key from OpenWeatherMap API
var apiKey ="1ea2723652fb48157c3662902e2f935d"
var queryURL = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}' + apiKey + '&units=imperial'

console.log(queryURL)

 // Create an AJAX call to retrieve data Log the data in console
 $.ajax({
   url: queryURL,
   method: 'GET'
 }).then(function(weatherData){
   $('.city').text("City: " + weatherData.name)
   $('.wind').text("wind speed: " + weatherData.wind.speed)
   $('.humidity').text("humidity: " + weatherData.main.humidity)
   $('.temp').text("temperature: " + weatherData.main.temp)
 })


 function k2f(K) {
    return Math.floor((K - 273.15) *1.8 +32);
}
 // Log the data in HTML
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast