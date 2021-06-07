

//form stuff
// variable to represent IDs in the html
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#cityNameInput");
// previous variable receive value from form
//prevents default and set of event listener of the button
var formSubmitHandler = function(event) {
    event.preventDefault();
    var userValue = nameInputEl.value.trim()
    if(userValue) {
        cityLocation(userValue);
        nameInputEl.value = '';
    } else {
    alert('please enter a city name')
    }
  };
userFormEl.addEventListener("submit", formSubmitHandler);


//old shit
var cityLocation = function (city) {
    // var city = "new york"
    console.log("function has started")
    var firstApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + 
    '&exclude=temp&appid=60f419afbafe35f58528b7ec4e85d06a';
    fetch(firstApiUrl)
    .then(function(response) {
        if (response.ok) {
         console.log(response);
         response.json().then(function(data){
console.log(data);

        });
    } else {

    }
});
//    .catch(function(error){
// alert('unable to connect')
//    })            
};






// 7 day forecast
// function start () {
//     console.log("function has started")
//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,current&appid=60f419afbafe35f58528b7ec4e85d06a"
//     ).then(function(response) {
//         response.json().then(function(data){
//             console.log(data);
//             var weatherData = data.daily;
//             console.log(weatherData);    
//         })
//     })     
// }
// start ()



