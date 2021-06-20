var clockElement = document.getElementById("clock");

function clock() {
    clockElement.textContent = new Date().toString();
}

setInterval(clock, 1000);

//dinamycly appned search rresults to searchInfoBox
var searchBtn = document.getElementById("search-btn");
searchBtn.onclick = function () {
var searchInfoBox = document.querySelector("#search-info-box");
searchInfoBox.setAttribute("class", "clickStyle");
var fromTo = document.querySelector("#from-to");
var flyingFrom = documnet.querySelector("#flying-from").value;
var flyingTo = document.querySelector("#flying-to").value
var arrowsIcon = document.createElement("h4");
arrowsIcon.setAttribute("class","sourceText");
arrowsIcon.append('<i class="fa-solid fa-right-left"></i>')
fromTo.innerHTML = '<div>' + flyingFrom + arrowsIcon + flyingTo + '</div>';

var returnDate = document.querySelector("#return-date").value;
var returnDateInfo = document.querySelector("#return-date-info");
returnDateInfo.innerHTML = '<div>'+ "Returning on" + returnDate + '</div>';
}
// dinamycly appned search rresults to searchResultsBox
var searchResultsBox = document.querySelector("#search-results-box");

//saved countries box

// load searches from local storage
var loadCountries = function () {
    countries = JSON.parse(localStorage.getItem("countries"));
    if (!countries) {
        countries = [];
    }
    $("#saved-countries").empty();

    countries.forEach(function (country) {
        $("#saved-countries").append("<button class='country-btn'>" + country + "</button>")
    })
}
// save searches to local storage
var saveCountries = function () {
    localStorage.setItem("countries", JSON.stringify(countries));
}







// find the html element with the id of time
// set the innerHTML of that element to the date a space the time
//document.getElementById('datetime').innerHTML = n + ' ' + time;






//fetch skyscanner data
//search variables:
//country(market country user is in): US
//current: USD
//destinationplace: default anywhere (look up additional places)
//if input matches a market, run fetch, else error "market not supported"
//inboundpartialdate:  yyyy-mm-dd, yyyy-mm or default anytime (return date)
//locale:en-US
//originplace: "IAH-sky" "AUM-sky", "DAL-sky", and "DFW-sky"

var departureDate = "2021-06-21";
var returnDate = "2021-06-25";
var destinationPlace = "anywhere";
var pointOfOrigin = "DFWA-sky";
var resultsLocale = "en-US"; //what we want results in
var currency = "USD";
var marketCountry = "US";
var limitedQuotes = [];
var Places = [];
var destinationId;
var destinationId;
var originId;
var carrierId;
var carrierIdIn;
var carriers;
var quotes;
var price;
var dateOfDeparture;
var travelDestinationOut;
var travelCountryOut;
var departurePointOut;
var departureCountryOut;
var dayOfReturn;
var airlineNameOut;
var airlineNameIn;
var countryOfTravel;


var pricing = document.querySelector("#pricing");
var dates = document.querySelector("#dates");
var destination = document.querySelector("#destination");
var airlines = document.querySelector("#airlines")

fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/" + marketCountry + "/" + currency + "/" + resultsLocale + "/" + pointOfOrigin + "/" + destinationPlace + "/" + departureDate + "/" + returnDate, {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "9f26d8ac82msh2648fcef3be4079p1494e7jsn9b0c1ca6e817",
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    }
})
    .then(function (results) {
        return results.json();
    })
    .then(function (results) {
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
        for (var i = 0; i < quotes.length; i++) {
            if (quotes[i].Direct === true) {
                limitedQuotes.push(quotes[i]);
                console.log(limitedQuotes);
            }
        }

        pricingInformation();
        tripDates();
        tripLocation();
        flightCarriers();

    })
    .catch(function (err) {
        console.error(err);
    })


var tripDates = function () {
    for (var d = 0; d < limitedQuotes.length; d++) {
        //dateOfDeparture[q]
        dateOfDeparture = limitedQuotes[d].OutboundLeg.DepartureDate
        console.log(dateOfDeparture);
        dateOfDeparture = dateOfDeparture.split("T")[0];
        console.log(dateOfDeparture + ": Departure Date ");

        //dateOfReturn[q]
        dateOfReturn = limitedQuotes[d].InboundLeg.DepartureDate
        dateOfReturn = dateOfReturn.split("T")[0];
        console.log(dateOfReturn + ": Return Date ");

        var dateli = document.createElement("li");
        dates.append(dateli);
        dateli.setAttribute("style", "height: 150px")
        dateli.innerHTML = "Departure: " + dateOfDeparture + "<br/> Return: " + dateOfReturn;
    }
}

var CountryOut = [];
var tripLocation = function () {
    for (var l = 0; l < limitedQuotes.length; l++) {
        //outbound flights

        //destination id outbound
        destinationId = limitedQuotes[l].OutboundLeg.DestinationId;
        console.log(destinationId + ": Destination ID ");

        //origin id outbound
        originId = limitedQuotes[l].OutboundLeg.OriginId
        console.log(originId + ": Origin ID ");


        //convert destination id and origin id into names
        for (var c = 0; c < places.length; c++) {
            if (destinationId === places[c].PlaceId) {
                travelDestinationOut = places[c].Name;
                console.log(travelDestinationOut + ": Location of Travel ")
                travelCountryOut = places[c].CountryName;
                CountryOut.push(travelCountryOut);
                console.log(travelCountryOut + ": Country of Travel");
            }

            //compare quoted origin id to PlaceId to find a match
            if (originId === places[c].PlaceId) {
                departurePointOut = places[c].Name;
                console.log(departurePointOut + " Place of Departure")
                departureCountryOut = places[c].CountryName;
                console.log(departureCountryOut + " Country of Departure")
            }
        }
        var destinationli = document.createElement("li");
        destination.append(destinationli);
        destinationli.setAttribute("style", "height: 150px");
        destinationli.innerHTML = "From: " + departurePointOut + " / " + departureCountryOut + "<br/> To: " + travelDestinationOut + " / " + travelCountryOut;

    }
}

var flightCarriers = function () {
    for (var a = 0; a < limitedQuotes.length; a++) {
        //carrierId(Outbound)
        carrierId = limitedQuotes[a].OutboundLeg.CarrierIds[0];
        console.log(carrierId + ": carrier id ")

        //carrierId(Inbound)
        carrierIdIn = limitedQuotes[a].InboundLeg.CarrierIds[0];
        console.log(carrierIdIn + ": carrier id ")

        if (carrierIdIn === carrierId) {
            for (var n = 0; n < carriers.length; n++) {
                if (carrierId === carriers[n].CarrierId) {
                    airlineNameOut = carriers[n].Name
                    console.log(airlineNameOut + " Carrier Name ")
                    var airlinesli = document.createElement("li");
                    airlinesli.setAttribute("style", "height: 150px")
                    airlines.append(airlinesli);
                    airlinesli.innerHTML = airlineNameOut + "<br/>"
                }
            }
        }
        else {
            console.log("different carriers")
        }
    }
}

var pricingInformation = function () {
    for (var q = 0; q < limitedQuotes.length; q++) {
        //price[q]
        price = limitedQuotes[q].MinPrice
        console.log(price + " min price ");
        var priceli = document.createElement("li")
        pricing.append(priceli);
        priceli.setAttribute("style", "height: 150px")
        priceli.innerHTML = "$ " + price + " <br/>";

        var priceBtn = document.createElement("button")
        priceBtn.setAttribute("class", "button is-warning select-button");
        priceBtn.setAttribute("id", "Button-" + q);
        priceBtn.textContent = "Select"
        priceli.append(priceBtn);
    }
    addEventListenertoSelect();
}

var addEventListenertoSelect = function () {
    var allSelectBtns = document.querySelectorAll(".select-button")
    for (var e = 0; e < allSelectBtns.length; e++) {
        allSelectBtns[e].addEventListener("click", countryChoice)
    }
    console.log(allSelectBtns);

}

var countryChoice = function (event) {
    console.log(event)
    var btnTarget = event.target.attributes[1].value;
    btnTarget = btnTarget.split("-")[1];

    console.log(btnTarget)
    // console.log(CountryOut[btnTarget])
    countryOfTravel = CountryOut[btnTarget]

    fetchTravelApi();

}

//Fizza this is the variable you can use for your api. I'm just struggling to pull it out of countryChoice function
function fetchTravelApi() {
    country = countryOfTravel;
    var travelAPI = "https://travelbriefing.org/" + country + "?format=json";

    fetch(travelAPI)
        .then(function (response) {
            if (!response || !response.ok) {
                throw new Error('Opps! No response');
            };
            return response.json();
        })
        .then(function (responseStr) {
            // display travel advice
            console.log("advise:" + responseStr.advise.UA.advise)//FROM AUSTRALIA

            //display required vaccination
            if (responseStr.vaccinations.length === 0) {
                console.log("There are no vaccinations for " + country)
            }

            for (let i = 0; i < responseStr.vaccinations.length; i++) {
                responseStr.vaccinations
                console.log("name: " + responseStr.vaccinations[i].name)
                console.log("message: " + responseStr.vaccinations[i].message)
            }
            //display weather
            var currentMonth = moment().format('MMMM'); // returns name eg. January      
            var temp = responseStr.weather[currentMonth].tAvg;
            temp = parseInt(temp).toFixed(1);
            console.log(temp + '°C');

            //display currency
        });
        travelAPI_2(countryOfTravel)
}
//api to get the country flags etc
function travelAPI_2(countryOfTravel)
{
 var travelApi2 = 'https://restcountries.eu/rest/v2/name/'+countryOfTravel;
 fetch(travelApi2)
 .then(function (response) {
     if (!response || !response.ok) {
         throw new Error('Opps! No response');
     };
     return response.json();
 })
 .then(function (responseStr) {
    //display flag
    console.log(responseStr[0].flag);
    // will use this to display the flag
   /* var flag= document.getElementById("flag");
    flag.setAttribute("src",responseStr[0].flag)*/

 });
 
}
