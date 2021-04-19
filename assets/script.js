var APIKey = "&appid=bb8feaf4a3ebe272bfd26ca244a0fc46";
//Access weather API//
var cityArr =
  JSON.parse(localStorage.getItem("cities")) || [];

$(document).ready(function () {
  var city = cityArr[cityArr.length - 1];
  fiveDay(city);
  createSearchHistory(city);
});

function createSearchHistory(city) {
  $("#currentWStats").empty();
  $("#temp").empty();
  $("#humidity").empty();
  $("#windSpeed").empty();
  $("#uvIndex").empty();

  var citySearch =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=db250259dcb16cabf6f6fefe0e7b51da";
  console.log(citySearch);

  $.ajax({
    url: citySearch,
    method: "GET",
  }).then(function (response) {

    //Grabs city name
    var cityName = response.name;
    console.log(cityName);
    var dateInfo = response.dt;
    console.log(dateInfo);
    var currentDate = moment.unix(dateInfo).format("L");
    console.log(currentDate);
    var iconDummy = "https://openweathermap.org/img/wn/";
    var iconPng = "@2x.png";
    var iconWeather = response.weather[0].icon;

    var iconURL = iconDummy + iconWeather + iconPng;
    console.log(iconURL);

    var iconImg = $("<img>");
    iconImg.attr("src", iconURL);
    $("#currentWStats").append(cityName + " ");
    $("#currentWStats").append(currentDate + " ");
    $("#currentWStats").append(iconImg);

    var K = response.main.temp;
    console.log(K);
    //change temp to Fahrenheit
    var F = ((K - 273.15) * 1.8 + 32).toFixed(0);
    console.log(F);

    $("#temp").append("Temperature: " + F + "°F");
    console.log("Temperature: " + F + "°F");

    var humidityInfo = response.main.humidity;
    $("#humidity").append(
      "Humidity: " + humidityInfo + "%"
    );


    console.log(response.wind.speed);
    var oldSpeed = response.wind.speed;
    console.log(oldSpeed);
    var newSpeed = (oldSpeed * 2.2369).toFixed(2);
    //append to
    $("#windSpeed").append(
      "Wind Speed: " + newSpeed + " MPH"
    );

    var lon = response.coord.lon;
    var lat = response.coord.lat;

    uvIndex(lon, lat);
  });
}


function uvIndex(lon, lat) {
  var indexURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=db250259dcb16cabf6f6fefe0e7b51da&lat=";
  var middle = "&lon=";
  var indexSearch = indexURL + lat + middle + lon;
  console.log(indexSearch);

  $.ajax({
    url: indexSearch,
    method: "GET",
  }).then(function (response) {
    var uvFinal = response.value;
    console.log("UV Index is: ");
    $("#uvIndex").append("UV Index: ");
    var uvBtn = $("<button>").text(uvFinal);

    if (uvFinal < 3) {
      uvBtn.addClass("uvGreen");
    } else if (uvFinal < 6) {
      uvBtn.addClass("uvYellow");
    } else if (uvFinal < 8) {
      uvBtn.addClass("uvOrange");
    } else if (uvFinal < 11) {
      uvBtn.addClass("uvRed");
    } else {
      uvBtn.addClass("uvPurple");
    }
    $("#uvIndex").append(uvBtn);
  });
}

function renderButtons() {
  $(".list-group").empty();

  //loop through cities list
  for (var i = 0; i < cityArr.length; i++) {
    var a = $("<li>");
    a.attr("id", "cityName");
    a.addClass("list-group-item");
    //add data from array
    a.attr("data-name", cityArr[i]);
    a.text(cityArr[i]);
    $("#searchHistory").append(a);
  }

  $("#cityName").on("click", function (event) {
    event.preventDefault();

    var city = $(this).data("name");
    console.log("prev searched city" + city);

    fiveDay(city);

    createSearchHistory(city);
  });
}

function fiveDay(city) {
  var fiveFront =
    "https://api.openweathermap.org/data/2.5/forecast?q=";
  var fiveURL = fiveFront + city + APIKey;
  console.log(fiveURL);
  $(".card-text").empty();
  $(".card-title").empty();

  $.ajax({
    url: fiveURL,
    method: "GET",
  }).then(function (response) {
    var date1 = moment
      .unix(response.list[1].dt)
      .utc()
      .format("L");
    $("#date1").append(date1);

    var date2 = moment
      .unix(response.list[9].dt)
      .utc()
      .format("L");
    $("#date2").append(date2);

    var date3 = moment
      .unix(response.list[17].dt)
      .utc()
      .format("L");
    $("#date3").append(date3);

    var date4 = moment
      .unix(response.list[25].dt)
      .utc()
      .format("L");
    $("#date4").append(date4);

    var date5 = moment
      .unix(response.list[33].dt)
      .utc()
      .format("L");
    $("#date5").append(date5);

    //adds icons to each card
    var icon1 = $("<img>");
    var icon1Src =
      "https://openweathermap.org/img/wn/" +
      response.list[4].weather[0].icon +
      "@2x.png";
    console.log("card Icon line 280" + icon1Src);
    icon1.attr("src", icon1Src);
    $("#icon1").append(icon1);

    var icon2 = $("<img>");
    var icon2Src =
      "https://openweathermap.org/img/wn/" +
      response.list[12].weather[0].icon +
      "@2x.png";
    icon2.attr("src", icon2Src);
    $("#icon2").append(icon2);

    var icon3 = $("<img>");
    var icon3Src =
      "https://openweathermap.org/img/wn/" +
      response.list[20].weather[0].icon +
      "@2x.png";
    icon3.attr("src", icon3Src);
    $("#icon3").append(icon3);

    var icon4 = $("<img>");
    var icon4Src =
      "https://openweathermap.org/img/wn/" +
      response.list[28].weather[0].icon +
      "@2x.png";
    icon4.attr("src", icon4Src);
    $("#icon4").append(icon4);

    var icon5 = $("<img>");
    var icon5Src =
      "https://openweathermap.org/img/wn/" +
      response.list[36].weather[0].icon +
      "@2x.png";
    icon5.attr("src", icon5Src);
    $("#icon5").append(icon5);

    $("#temp1").append("Temp: ");
    $("#temp1").append(
      tempAvg(
        response.list[2].main.temp,
        response.list[4].main.temp,
        response.list[6].main.temp
      )
    );
    $("#temp1").append(" °F");

    $("#temp2").append("Temp: ");
    $("#temp2").append(
      tempAvg(
        response.list[10].main.temp,
        response.list[12].main.temp,
        response.list[14].main.temp
      )
    );
    $("#temp2").append(" °F");

    $("#temp3").append("Temp: ");
    $("#temp3").append(
      tempAvg(
        response.list[18].main.temp,
        response.list[20].main.temp,
        response.list[22].main.temp
      )
    );
    $("#temp3").append(" °F");

    $("#temp4").append("Temp: ");
    $("#temp4").append(
      tempAvg(
        response.list[26].main.temp,
        response.list[28].main.temp,
        response.list[30].main.temp
      )
    );
    $("#temp4").append(" °F");

    $("#temp5").append("Temp: ");
    $("#temp5").append(
      tempAvg(
        response.list[34].main.temp,
        response.list[36].main.temp,
        response.list[38].main.temp
      )
    );
    $("#temp5").append(" °F");

    $("#hum1").append("Humidity: ");
    $("#hum1").append(
      humidityAvg(
        response.list[2].main.humidity,
        response.list[4].main.humidity,
        response.list[6].main.humidity
      )
    );
    $("#hum1").append("%");

    $("#hum2").append("Humidity: ");
    $("#hum2").append(
      humidityAvg(
        response.list[10].main.humidity,
        response.list[12].main.humidity,
        response.list[14].main.humidity
      )
    );
    $("#hum2").append("%");

    $("#hum3").append("Humidity: ");
    $("#hum3").append(
      humidityAvg(
        response.list[18].main.humidity,
        response.list[20].main.humidity,
        response.list[22].main.humidity
      )
    );
    $("#hum3").append("%");

    $("#hum4").append("Humidity: ");
    $("#hum4").append(
      humidityAvg(
        response.list[26].main.humidity,
        response.list[28].main.humidity,
        response.list[30].main.humidity
      )
    );
    $("#hum4").append("%");

    $("#hum5").append("Humidity: ");
    $("#hum5").append(
      humidityAvg(
        response.list[34].main.humidity,
        response.list[36].main.humidity,
        response.list[38].main.humidity
      )
    );
    $("#hum5").append("%");
  });
}

function tempAvg(x, y, z) {
  var avgThree = (x + y + z) / 3.0;
  var avgReturn = ((avgThree - 273.15) * 1.8 + 32).toFixed(
    0
  );
  return avgReturn;
}

function humidityAvg(x, y, z) {
  var avgHum = (x + y + z) / 3.0;
  return avgHum.toFixed(0);
}

$("#search").on("click", function (event) {
  event.preventDefault();

  var city = $("#city").val().trim();

  var containsCity = false;

  if (cityArr != null) {
    $(cityArr).each(function (x) {
      if (cityArr[x] === city) {
        containsCity = true;
      }
    });
  }

  if (containsCity === false) {
    cityArr.push(city);
  }

  localStorage.setItem("cities", JSON.stringify(cityArr));

  fiveDay(city);
  createSearchHistory(city);
  renderButtons();
});
renderButtons();