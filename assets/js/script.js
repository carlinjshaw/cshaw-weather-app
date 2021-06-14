

//form stuff
// variable to represent IDs in the html
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#cityNameInput");
// previous variable receive value from form
//prevents default and set of event listener of the button
var formSubmitHandler = function(event) {
    event.preventDefault();
//variable storing the input into the inpt html element
    var userValue = nameInputEl.value.trim()
    if(userValue) {
        cityLocation(userValue);
        nameInputEl.value = '';
        }

  };
//calling the previous function and assing a listener to the "submit" type in the form
userFormEl.addEventListener("submit", formSubmitHandler);



//API gets user city name and outputs cooridnates to the next API
var cityLocation = function (city) {
  // console.log("function has started")
  var firstApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&exclude=temp&appid=60f419afbafe35f58528b7ec4e85d06a";
  fetch(firstApiUrl).then(function (response) {
    if (response.ok) {
      //  console.log(response);
      response.json().then(function (data) {
          console.log(data)
          console.log(data.name)
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;
        var coordinate = "lat=" + latitude + "&lon=" + longitude;
        var cityName = data.name
        forecast(coordinate, cityName);
      });
    } else {
      alert("please enter a city name");
    }
  });
  //    .catch(function(error){
  // alert('unable to connect')
  //    })
};


//one call weather API
var forecast = function (location, cityName) {
  // location = "lat=33.44&lon=-94.04"
  var secondAPiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?" +
    location +
    "&exclude=hourly,minutely&units=imperial&appid=60f419afbafe35f58528b7ec4e85d06a";
  fetch(secondAPiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
          console.log(data)
//variables for the current day
        var currentTemp = JSON.stringify(data.current.temp);
        var currentWind = JSON.stringify(data.current.wind_speed);
        var currentHum = JSON.stringify(data.current.humidity);
        var currentUvi = JSON.stringify(data.current.uvi);
//variables for the first day of forecast
        var daytwoTemp = "High: " + JSON.stringify(data.daily[0].temp.max) + 
            " ℉ Low: " + JSON.stringify(data.daily[0].temp.min) + " ℉";
        var daytwoWind = JSON.stringify(data.daily[0].wind_speed);
        var daytwoHum = JSON.stringify(data.daily[0].humidity);
//variable for the second day of forecast
        var daythreeTemp = "High: " + JSON.stringify(data.daily[1].temp.max) +
             " ℉ Low: " + JSON.stringify(data.daily[1].temp.min) + " ℉";
        var daythreeWind = JSON.stringify(data.daily[1].wind_speed);
        var daythreeHum = JSON.stringify(data.daily[1].humidity);
//variable for the third day of forecast
        var dayfourTemp = "High: " + JSON.stringify(data.daily[2].temp.max) +
             " ℉ Low: " + JSON.stringify(data.daily[2].temp.min) + " ℉";
        var dayfourWind = JSON.stringify(data.daily[2].wind_speed);
        var dayfourHum = JSON.stringify(data.daily[2].humidity);
//variable for the third day of forecast
        var dayfiveTemp = "High: " + JSON.stringify(data.daily[3].temp.max) +
            " ℉ Low: " + JSON.stringify(data.daily[3].temp.min) + " ℉";
        var dayfiveWind = JSON.stringify(data.daily[3].wind_speed);
        var dayfiveHum = JSON.stringify(data.daily[3].humidity);
//variable for the fourth day of forecast
        var daysixTemp = "High: " + JSON.stringify(data.daily[4].temp.max) +
            " ℉ Low: " + JSON.stringify(data.daily[4].temp.min) + " ℉";
        var daysixWind = JSON.stringify(data.daily[4].wind_speed);
        var daysixHum = JSON.stringify(data.daily[4].humidity);


        createContent(currentTemp, currentWind, currentHum, currentUvi, 
            daytwoTemp, daytwoWind, daytwoHum,
            daythreeTemp, daythreeWind, daythreeHum,
            dayfourTemp, dayfourWind, dayfourHum,
            dayfiveTemp, dayfiveWind, dayfiveHum,
            daysixTemp, daysixWind, daysixHum)

            storeLocal(currentTemp, currentWind, currentHum, currentUvi, 
                daytwoTemp, daytwoWind, daytwoHum,
                daythreeTemp, daythreeWind, daythreeHum,
                dayfourTemp, dayfourWind, dayfourHum,
                dayfiveTemp, dayfiveWind, dayfiveHum,
                daysixTemp, daysixWind, daysixHum, cityName)
      });
    }
  });
};

var createContent = function (temp, wind, humidity, uvi, 
    d2Temp,d2Wind, d2Hum,
    d3Temp,d3Wind, d3Hum,
    d4Temp, d4Wind, d4Hum,
    d5Temp, d5Wind, d5Hum,
    d6Temp, d6Wind, d6Hum) {

console.log(temp)
  $("#current-data").text(temp + " ℉");
  $("#current-wind").text(wind + " MPH");
  $("#current-humidity").text(humidity + " %");
  $("#current-uvi").text(uvi);

  $("#daytwo-temp").text(d2Temp);
  $("#daytwo-wind").text(d2Wind + " MPH");
  $("#daytwo-humidity").text(d2Hum + " %");

  $("#daythree-temp").text(d3Temp);
  $("#daythree-wind").text(d3Wind + " MPH");
  $("#daythree-humidity").text(d3Hum + " %");

  $("#dayfour-temp").text(d4Temp);
  $("#dayfour-wind").text(d4Wind + " MPH");
  $("#dayfour-humidity").text(d4Hum + " %")
  
  $("#dayfive-temp").text(d5Temp);
  $("#dayfive-wind").text(d5Wind + " MPH");
  $("#dayfive-humidity").text(d5Hum + " %")
  
  $("#daysix-temp").text(d6Temp);
  $("#daysix-wind").text(d6Wind + " MPH");
  $("#daysix-humidity").text(d6Hum + " %");
};


var dates = function (){
    var currentDate = dayjs().format('dddd MMM D')
    console.log(currentDate)
    $("#current-date").text(currentDate)
    $("#daytwo-date").text(dayjs().add(1, 'day').format('ddd D / M'))
    $("#daythree-date").text(dayjs().add(2, 'day').format('ddd D / M'))
    $("#dayfour-date").text(dayjs().add(3, 'day').format('ddd D / M'))
    $("#dayfive-date").text(dayjs().add(4, 'day').format('ddd D / M'))
    $("#daysix-date").text(dayjs().add(5, 'day').format('ddd D / M'))

}
dates()

function storeLocal (temp, wind, humidity, uvi, 
    d2Temp,d2Wind, d2Hum,
    d3Temp,d3Wind, d3Hum,
    d4Temp, d4Wind, d4Hum,
    d5Temp, d5Wind, d5Hum,
    d6Temp, d6Wind, d6Hum, cityName) {
    console.log(cityName)
    Key = cityName
    localStorage.setItem(Key,temp)
}