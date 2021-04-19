const searchCity = $("#search-city");
const searchButton = $("#search-button");
const clearButton = $("#clear-button");
const presentCity = $("#present-city");
const presentTemperature = $("#temperature");
const humidty= $("#humidity");
const windSpeed=$("#wind-speed");
const uvIndexList= $("#uv-index");
const APIKey="bb8feaf4a3ebe272bfd26ca244a0fc46";
const hList = $(".list-group")

var cityArray=JSON.parse(localStorage.getItem("cityname")) || []
var city="";
var d = new Date();
var year = d.getFullYear()
var month = d.getMonth()+1;
var day = d.getDate();
var date=  day + "." + month+ "." + year


function removeDuplicates () {
    cityArrayUnique = cityArray.filter(
        function(a) {if (!this[a]) {this[a] = 1; return a;}},{}
        
        )
        cityArray = cityArrayUnique
        localStorage.setItem('cityname', JSON.stringify(cityArray))
        hList.empty()
}

// saves users search input
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val()!==""){
        city=searchCity.val();
        presentWeather();
    }}

// getting info from weather API  
function presentWeather(){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        $(presentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        var tempC = (response.main.temp - 273.15);
        $(presentTemperature).html(" " + tempC.toFixed(2) + " Celsius");
        $(humidty).html(" " +response.main.humidity+"%");
       
        var responsWindSpeed=response.wind.speed;
        var winds=responsWindSpeed;
        $(windSpeed).html(" " + winds + "m/s");

        uvIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
                cityArray.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(cityArray));
                addToList();
        }
            );
}
// getting additional info from API
function uvIndex(ln,lt){
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                if(response.value < 2){
                    $(uvIndexList).html(" " +response.value);
                    $(uvIndexList).css("background-color", "lightgreen")}
                    else if(response.value < 5) {
                        $(uvIndexList).html(" " +response.value);
                        $(uvIndexList).css("background-color", "lightyellow")
                    }
                    else if(response.value < 7) {
                        $(uvIndexList).html(" " +response.value);
                        $(uvIndexList).css("background-color", "orange")
                    }
                    else {
                        $(uvIndexList).html(" " +response.value);
                        $(uvIndexList).css("background-color", "red")
                    }
            });
}
// gets info from API 
function forecast(cityid){
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        for (i=0;i<6;i++){
            var iconcode= response.list[i].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var tempK= response.list[i].main.temp;
            var tempC=(tempK-273.5);
            var humidity= response.list[i].main.humidity;
            var fDays=parseInt(day + i)
            $("#fDate"+i).html(" " + fDays +"." + month);
            $("#Img"+i).html("<img src="+iconurl+">");
            $("#Temp"+i).html(tempC.toFixed(2));
            $("#Humidity"+i).html(humidity+"%");
        }
    });
}

// makes last search list useful
function getPastSearch(event){
    var target=event.target;
    if (event.target.matches("li")){
        city=target.textContent.trim();
        presentWeather(city);
    }
}

// clear search list and local storage
function clearHistory(event){
    event.preventDefault();
    city=""
    cityArray=[];
    localStorage.clear();
    $(hList).empty()
}

function addToList () {
    removeDuplicates()
    JSON.parse(localStorage.getItem("cityname"))
    for(var i = 0; i<cityArray.length; i++) {
    var citylist = $('<li>' + cityArray[i]+"</li>")
    hList.prepend(citylist)
}}

addToList ()
$("#search-button").on("click",displayWeather);
$(document).on("click",getPastSearch);
$("#clear-button").on("click",clearHistory);