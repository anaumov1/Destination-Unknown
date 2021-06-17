// get a new date (locale machine date time)
var date = new Date();
// get the date as a string
var n = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString();

// find the html element with the id of time
// set the innerHTML of that element to the date a space the time
document.getElementById('datetime').innerHTML = n + ' ' + time;