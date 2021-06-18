// get a new date (locale machine date time)
var date = new Date();
// get the date as a string
var n = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString();

// find the html element with the id of time
// set the innerHTML of that element to the date a space the time
document.getElementById('datetime').innerHTML = n + ' ' + time;






//fetch skyscanner data
//search variables:
//country(market country user is in): US
//current: USD
//destinationplace: default anywhere (look up additional places)
    //if input matches a market, run fetch, else error "market not supported"
//inboundpartialdate:  yyyy-mm-dd, yyyy-mm or default anytime (return date)
//locale:en-US
//originplace: "IAH-sky" "AUM-sky", "DAL-sky", and "DFW-sky"

 var departureDate = "2021-06-18";
 var returnDate = "2021-06-25";
 var destinationPlace = "anywhere";
 var pointOfOrigin =  "DFWA-sky";
 var resultsLocale = "en-US"; //what we want results in
 var currency = "USD";
 var marketCountry = "US";
 var limitedQuotes = [];

fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/"+marketCountry+"/"+ currency + "/" + resultsLocale +"/" + pointOfOrigin + "/" + destinationPlace + "/"+ departureDate + "/" + returnDate ,{
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9f26d8ac82msh2648fcef3be4079p1494e7jsn9b0c1ca6e817",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(function(results) {
  return results.json();
})
.then(function(results){
    console.log(results);
    console.log(results.Places[0]);
    console.log(results.Carriers);
    console.log(results.Quotes);
    console.log(results.Quotes[10].OutboundLeg.DepartureDate);
    console.log(results.Quotes.length);

    //take quotes and pull acceptable (direct flight) quotes
    for (i = 0; i< results.Quotes.length; i++){
        if(results.Quotes[i].Direct === true){
            limitedQuotes.push(results.Quotes[i]);
            //console.log(results.Quotes[i]);
            
        }              
    }
    //iterate through all the quotes to pull the price, departure date and origin, country of arrival and return date
    console.log(limitedQuotes.length);
    for (q = 0; q < limitedQuotes.length; q ++){
        console.log(limitedQuotes[q].MinPrice + " min price ");
        console.log(limitedQuotes[q].OutboundLeg.CarrierIds[0] + ": carrier id ")
        console.log(limitedQuotes[q].OutboundLeg.DepartureDate + ": Departure Date ");
        console.log(limitedQuotes[q].OutboundLeg.DestinationId + ": Destination ID ");
        console.log(limitedQuotes[q].OutboundLeg.OriginId + ": Origin ID ");

    }
    


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
