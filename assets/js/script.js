// get a new date (locale machine date time)
var date = new Date();
// get the date as a string
var n = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString();

// find the html element with the id of time
// set the innerHTML of that element to the date a space the time
document.getElementById('datetime').innerHTML = n + ' ' + time;
// const url = 'https://api.giphy.com/v1/gifs/random?api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN'
// fetch(url).then(function(response){
//     return response.json()})
     
//     .then(function(data){
//     return 
    
// });


fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/DFW/anywhere/anytime/anytime", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9f26d8ac82msh2648fcef3be4079p1494e7jsn9b0c1ca6e817",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(function(response) {
  return response.json();
})
.then(function(data){
 console.log(data);
})
.catch(function(err){
    console.error(err);
})

travelBriefUrl = "https://travelbriefing.org/Netherlands?format=json"

fetch(travelBriefUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
})
