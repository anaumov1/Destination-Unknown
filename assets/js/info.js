//fetch the selected country
country = localStorage.getItem("selected-country");
//display country name on top
document.getElementById("country-name").textContent = country;
function showOverview() {
    var overviewDisplay = document.querySelector(".overview");
    overviewDisplay.style.display = "grid";
    var travelAdviceDisplay = document.querySelector(".advice");
    travelAdviceDisplay.style.display = "none";
    var neighboursDisplay = document.querySelector(".neighbours");
    neighboursDisplay.style.display = "none";
    var weatherDisplay = document.querySelector(".weather");
    weatherDisplay.style.display = "none";

}

function showAdvice() {
    var overviewDisplay = document.querySelector(".overview");
    overviewDisplay.style.display = "none";
    var travelAdviceDisplay = document.querySelector(".advice");
    travelAdviceDisplay.style.display = "grid";

    var neighboursDisplay = document.querySelector(".neighbours");
    neighboursDisplay.style.display = "none";
    var weatherDisplay = document.querySelector(".weather");
    weatherDisplay.style.display = "none";
}

function showNeighbours() {
    var overviewDisplay = document.querySelector(".overview");
    overviewDisplay.style.display = "none";
    var travelAdviceDisplay = document.querySelector(".advice");
    travelAdviceDisplay.style.display = "none";
    var neighboursDisplay = document.querySelector(".neighbours");
    neighboursDisplay.style.display = "grid";
    var weatherDisplay = document.querySelector(".weather");
    weatherDisplay.style.display = "none";
}

function showWeather() {
    var overviewDisplay = document.querySelector(".overview");
    overviewDisplay.style.display = "none";
    var travelAdviceDisplay = document.querySelector(".advice");
    travelAdviceDisplay.style.display = "none";
    var neighboursDisplay = document.querySelector(".neighbours");
    neighboursDisplay.style.display = "none";
    var weatherDisplay = document.querySelector(".weather");
    weatherDisplay.style.display = "grid";
}

function DisplayInfo() {

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
            travelAdvise(responseStr)
            //display vaccination 

            //display weather
            weather(responseStr);

            //display neighbors
            neighbours(responseStr);
            console.log(responseStr)
        });
}
function weather(responseStr) {
    var weatherEl = document.getElementById("weather-month");
    var currentMonth = moment().format('MMMM'); // returns name eg. January    
    weatherEl.textContent = currentMonth;
    //average
    var temp = responseStr.weather[currentMonth].tAvg;
    temp = parseInt(temp).toFixed(1);
    //covert in  fahrenheit
    temp = (temp * 9 / 5) + 32;

    weatherEl.textContent += ' is ' + temp + '°F';
    //lowest
    var lowEl = document.getElementById("low");
    var currentMonth = moment().format('MMMM'); // returns name eg. January    
    lowEl.textContent = currentMonth;
    var temp = responseStr.weather[currentMonth].tMax;
    temp = parseInt(temp).toFixed(1);
    //covert in  fahrenheit
    temp = (temp * 9 / 5) + 32;

    lowEl.textContent += ' is ' + temp + '°F';
    //high
    var highEl = document.getElementById("high");
    var currentMonth = moment().format('MMMM'); // returns name eg. January    
    highEl.textContent = currentMonth;
    var temp = responseStr.weather[currentMonth].tMin;
    temp = parseInt(temp).toFixed(1);
    //covert in  fahrenheit
    temp = (temp * 9 / 5) + 32;

    highEl.textContent += ' is ' + temp + '°F';
}
function neighbours(responseStr) {
    var ul = document.getElementById("neighbours-list");
    for (let i = 0; i < responseStr.neighbors.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i + 1) + " . " + responseStr.neighbors[i].name;

        ul.append(li);
    }

}
function travelAdvise(responseStr) {
    document.getElementById("travel-advice").textContent = responseStr.advise.UA.advise;
    vaccination(responseStr)
}
//api to get the country flags etc
function OverView(countryOfTravel) {
    var travelApi2 = 'https://restcountries.eu/rest/v2/name/' + countryOfTravel;
    fetch(travelApi2)
        .then(function (response) {
            if (!response || !response.ok) {
                throw new Error('Opps! No response');
            };
            return response.json();
        })
        .then(function (responseStr) {
            //display flag
            flag(responseStr);
            //display capital
            capital(responseStr);
            //display region
            region(responseStr);
            //display languages
            languages(responseStr);

            //console.log(responseStr[0]);
            // will use this to display the flag
        });


}

function languages(responseStr) {
    var langEl = document.getElementById("language");
    for (let i = 0; i < responseStr[0].languages.length; i++) {
        langEl.textContent += "\t" + responseStr[0].languages[i].name
        //to add ',' after every language name except the last one
        if (responseStr[0].languages.length > 0 && i < responseStr[0].languages.length - 1) {
            langEl.textContent += ","
        }
    }
}

function region(responseStr) {
    document.getElementById("region").textContent = "\t" + responseStr[0].region;
}
function capital(responseStr) {
    document.getElementById("capital").textContent = "\t" + responseStr[0].capital;
}
function flag(responseStr) {
    var flagImg = document.createElement('img');
    var flagContainer = document.getElementById("flag")
    flagImg.setAttribute('src', responseStr[0].flag);
    flagImg.setAttribute('alt', 'add flag');
    flagContainer.append(flagImg);
}
function vaccination(responseStr) {
    //display required vaccination

    if (responseStr.vaccinations.length === 0) {
        var vacEl = document.createElement("p");
        vacEl.textContent = "There are no vaccinations for " + country;
        document.querySelector("#vaccination").appendChild(vacEl);

    }
    else {
        var heading = document.createElement("p");
        heading.setAttribute("style", "font-weight:bolder ")
        heading.innerHTML = "<br>Required Vaccination<br>";
        document.querySelector("#vaccination").append(heading);

        var vaculEl = document.getElementById("list");

        for (let i = 0; i < responseStr.vaccinations.length; i++) {
            var vacEl = document.createElement("li");
            vacEl.innerHTML = "<br>" + (i + 1) + ". " + responseStr.vaccinations[i].name + " : " + responseStr.vaccinations[i].message + "<br>";
            vaculEl.appendChild(vacEl)
        }
        document.querySelector("#vaccination").append(vaculEl);


    }
}

window.onload = function () {
    //display overvire
    showOverview()
    //added flag, capital
    OverView(country)
    //display all the required info
    DisplayInfo();
};



