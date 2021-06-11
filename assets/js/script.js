

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
        forecast(coordinate);
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
var forecast = function (location) {
  // location = "lat=33.44&lon=-94.04"
  var secondAPiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?" +
    location +
    "&exclude=hourly,minutely&units=imperial&appid=60f419afbafe35f58528b7ec4e85d06a";
  fetch(secondAPiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
          console.log(data)
        var currentTemp = JSON.stringify(data.current.temp);
        console.log(currentTemp)
        var currentWind = JSON.stringify(data.current.wind_speed)
        // console.log(data.current.wind_speed);
        // console.log(data.current.humidity);
        // console.log(data.current.uvi)
        // console.log(data.current.weather[0].icon)
        createContent(currentTemp, currentWind)
      });
    }
  });
};

var createContent = function (temp, wind) {
//   var tempEl = document.getElementById("current-data");
//   tempEl.textContent(temp);
console.log(temp)
  $("#current-data").text(temp + " ℉");
  $("#current-wind").text(wind + " MPH");
};


