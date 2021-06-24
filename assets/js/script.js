//declare variables
//originplace: "IAH-sky" "AUM-sky", "DWFA-sky"

var storageObject;
var destinationPlace = "anywhere";
var resultsLocale = "en-US"; 
var currency = "USD";
var marketCountry = "US";
var limitedQuotes = [];
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
var allPlaces;
var skyScannerCountryCode;
var skyScannerStationCode;
var returnDate;
var btnTargetHistory;

var previousSearchContainer = document.querySelector("#saved-countries");
var flightDisplay = document.getElementById("flight-display")
var pricing = document.querySelector("#pricing");
var dates = document.querySelector("#dates");
var destination = document.querySelector("#destination");
var airlines = document.querySelector("#airlines")
var formSubmit = document.querySelector("#submit");




//onload of page, load countries
window.onload = function(){
    loadCountries();
};

function linkInfoPage() {
    window.location.href = "countries.html";
}

// load searches from local storage
var loadCountries = function () {
    storageObject = JSON.parse(localStorage.getItem("storageObject"));
    console.log(storageObject)
    //if storageObject doesn't exist, initialize object
    if(storageObject === null){
        console.log("empty storage");
        storageObject = [];
    }
    else{
        console.log("loading storage");
        storageObject = JSON.parse(localStorage.getItem("storageObject"));
        console.log(storageObject);

        //iterate through storageObject and create buttons for each previously searched country
        for(var i = 0; i < storageObject.length; i++){
            var previousSearchBtn = document.createElement("button");
            previousSearchBtn.setAttribute("class", "button is-success  previousSearch");
            previousSearchBtn.style.marginLeft = "20px";
            previousSearchBtn.style.marginRight = "20px";
            previousSearchBtn.setAttribute("id",i);
            previousSearchBtn.innerText = storageObject[i];
            previousSearchContainer.append(previousSearchBtn);

        }
        addEventListenerToHistory()
        
    }
};


var addEventListenerToHistory = function () {
    var allHistoryBtns = document.querySelectorAll(".is-success")
    for (var e = 0; e < allHistoryBtns.length; e++) {
        alert("im click this")
        allHistoryBtns[e].addEventListener("click", selectCountry)
    }
    console.log(allHistoryBtns);

}

var selectCountry = function (event) {
    console.log(event)
    // btnTargetHistory = event.target.firstChild.data;
    btnTargetHistory = event.target.innerHTML;
    console.log(btnTargetHistory);
    if(btnTargetHistory === null || undefined){
        btnTargetHistory = event.target.firstChild.data;
        console.log(btnTargetHistory);
    }
    console.log(btnTargetHistory);
    countryOfTravel = btnTargetHistory; 
    // debugger;
    //fetchTravelApi(); 
    localStorage.setItem("selected-country",countryOfTravel);
    linkInfoPage(); 
}  



function display_clock() {
    var x = new Date()
    var ampm = x.getHours() >= 12 ? ' PM' : ' AM';

    var x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getFullYear();
    x1 = x1 + " - " + x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds() + ":" + ampm;
    document.getElementById('clock').innerHTML = x1;
    display_c5();
}
function display_c5() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_clock()', refresh)
}
display_c5()







// listen to submit button on form
formSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    //grab value of ptOfOrigin from form (current default: IAH,AUM or DWFA)
    var pointOfOrigin = document.getElementById("ptOfOrigin").value;
    console.log(pointOfOrigin);

    //grab departureDate from calendar on form
    var departureDate = document.querySelector("#departure-date").value;
    //formating date to YYYY/MM/DD
    var departureDateFormat = moment(departureDate).format("YYYY/MM/DD");
    console.log(departureDateFormat);
    console.log(departureDate);

    // let today = new Date().toLocaleDateString()
    // console.log(today);
    // console.log(departureDate);

    // //validate departureDate
    // if(departureDate < today){
    //     alert("date in the past");
    // }

    //grab returnDate from calendar on form
    returnDate = document.querySelector("#return-date").value;
    //formating date to YYYY/MM/DD
    var returnDateFormat = moment(returnDate).format("YYYY/MM/DD");
    console.log(returnDateFormat);
    console.log(returnDate);

    //grab destination( current default: anywhere)
    var destinationPlace = document.getElementById("flying-to").value
    console.log(destinationPlace);

    //fetch skyscanner data
    //search variables:
    //country(market country user is in): US
    //current: USD
    //destinationplace: default anywhere (look up additional places)
    //if input matches a market, run fetch, else error "market not supported"
    //departureDate:  yyyy-mm-dd, yyyy-mm  (departure Date)
    //returnDate: yyyy-mm-dd, yyyy-mm (return Date)
    //locale:en-US
    //originplace: "IAH-sky" "AUM-sky", "DAL-sky", and "DFW-sky"
    

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
            for (var n = 0; n < carriers.length; n++) {
                if (carrierId === carriers[n].CarrierId) {
                    airlineNameOut = carriers[n].Name
                    console.log(airlineNameOut + " Carrier Name ");
                }
                if (carrierIdIn === carriers[n].CarrierId) {
                    airlineNameIn = carriers[n].Name
                    console.log(airlineNameIn + " Carrier Name In")

                    var airlinesli = document.createElement("li");
                    airlinesli.setAttribute("style", "height: 150px")
                    airlines.append(airlinesli);
                    airlinesli.innerHTML = airlineNameOut + "/<br/>" + airlineNameIn;
                }
            }
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
        priceBtn.setAttribute("class", "button is-info select-button");
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
    //target event
    var btnTarget = event.target.attributes[1].value;
    btnTarget = btnTarget.split("-")[1];
    console.log(btnTarget)

    //set country of travel to value 
    countryOfTravel = CountryOut[btnTarget]  


    //check to see if storageObject exists and if it contains the currently selected country of Travel
    if(storageObject){
        var contains = storageObject.includes(countryOfTravel);
        console.log(contains);
    } 
    
    //if contains returns true, value already exists
    if(contains){
        console.log(contains);
        console.log("value exists");
    }
    else{
        //returns false, new value is added to storage and a button is created to contain the country name
        console.log("adding new value");

        //create button with value of countryOfTravel
        var previousSearchBtn = document.createElement("button");
        previousSearchBtn.setAttribute("class", "button is-success  previousSearch");
        previousSearchBtn.style.marginLeft = "20px";
        previousSearchBtn.style.marginRight = "20px";
        previousSearchBtn.innerHTML = countryOfTravel;
        previousSearchContainer.append(previousSearchBtn);
        addEventListenerToHistory();

        

        //new countryOfTravel is added to the storageObject which is then set to localStorage
        storageObject.push(countryOfTravel);
        console.log(storageObject);
        localStorage.setItem('storageObject', JSON.stringify(storageObject));

        
    }
 

    //populate from-to banner
    console.log(countryOfTravel);
    var fromTo = document.querySelector("#from-to");
    fromTo.innerHTML = " " + travelDestinationOut;
    fromTo.setAttribute("style", "padding-right: 50px");
    var returnDateInfo = document.querySelector("#return-date-info");
    returnDateInfo.innerHTML = returnDate;

    //create arrow icon
    var iconContainer = document.querySelector("#icon");
    iconImage = document.createElement("i");
    iconContainer.append(iconImage)
    iconImage.innerHTML = '<i class="fa-solid fa-right-left"></i>'
    localStorage.setItem("selected-country",countryOfTravel);
    // window.open("countries.html","_self")
    linkInfoPage(); 
}

