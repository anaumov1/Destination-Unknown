var clockElement = document.getElementById("clock");

function clock() {
    clockElement.textContent = new Date().toString();
}

setInterval(clock, 1000);

// dinamycly appned search rresults to searchResultsBox
    var searchResultsBox = document.querySelector("#search-results-box");

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
 var Places = [];
 var destinationId = [];
 var originId;
 var carrierId;
 var carriers;
 var quotes;
 var price;
 var dateOfDeparture;
 var travelDestination;
 var travelCountry;
 var departurePoint;
 var departureCountry;

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

    //pull carriers from fetch response
    carriers = results.Carriers;
    console.log(carriers);
    console.log(carriers.length);

    //pull quotes from fetch response
    quotes = results.Quotes;
    console.log(quotes);
    console.log(quotes.length);

    //pull places from fetch response
    places = results.Places
    console.log(places)
    console.log(places.length);

    //reduce quotes to only thoses with direct flights
    for (var i = 0; i< quotes.length; i++){
        if(quotes[i].Direct === true){
            limitedQuotes.push(quotes[i]);
            console.log(limitedQuotes);
            
        }              
    }
    
    //iterate through all the quotes to pull the price, departure date and origin, country of arrival and return date
    for (var q = 0; q < limitedQuotes.length; q ++){

        //price[q]
        price = limitedQuotes[q].MinPrice
        console.log(price + " min price ");

        //carrierId[q]
        carrierId = limitedQuotes[q].OutboundLeg.CarrierIds[0];
        console.log(carrierId + ": carrier id ")

        //match carrier id from limitedQuote with carrier name from carriers
        for( var n = 0; n < carriers.length; n++){
            if(carrierId === carriers[n].CarrierId ){
                console.log(carriers[n].Name + " Carrier Name " )
            }
        }

        //dateOfDeparture[q]
        dateOfDeparture = limitedQuotes[q].OutboundLeg.DepartureDate
        console.log( dateOfDeparture + ": Departure Date ");

        //destination id
        destinationId= limitedQuotes[q].OutboundLeg.DestinationId;
        console.log(destinationId + ": Destination ID ");

        //origin id
        originId = limitedQuotes[q].OutboundLeg.OriginId
        console.log(originId +  ": Origin ID ");


        //convert destination id and origin id into names
        for(var c = 0; c < places.length; c++){
            if(destinationId === places[c].PlaceId){
                travelDestination = places[c].Name; 
                console.log(travelDestination+ ": Location of Travel ")
                travelCountry = places[c].CountryName;
                console.log(travelCountry + ": Country of Travel");
            }

            //compare quoted origin id to PlaceId to find a match
            if(originId === places[c].PlaceId){
                departurePoint = places[c].Name;
                console.log(  departurePoint + " Place of Departure")
                departureCountry = places[c].CountryName;
                console.log(departureCountry + " Country of Departure")
            }
        }      
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
