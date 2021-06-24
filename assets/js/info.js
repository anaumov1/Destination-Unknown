//fetch the selected country
country = localStorage.getItem("selected-country");
//display country name on top
document.getElementById("country-name").textContent=country;
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
            var currentMonth = moment().format('MMMM'); // returns name eg. January      
            var temp = responseStr.weather[currentMonth].tAvg;
            temp = parseInt(temp).toFixed(1);
           // console.log(temp + '°C');

            //display capital
           // console.log(responseStr)
        });
}
function travelAdvise(responseStr)
{
      document.getElementById("travel-advice").textContent=responseStr.advise.UA.advise;
      vaccination(responseStr)
}
//api to get the country flags etc
function OverView (countryOfTravel) {
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

            console.log(responseStr[0]);
            // will use this to display the flag
        });


}

function languages(responseStr)
{
         var langEl=document.getElementById("language");
           for (let i = 0; i < responseStr[0].languages.length; i++)
            {
                langEl.textContent+="\t"+responseStr[0].languages[i].name
//to add ',' after every language name except the last one
                if(responseStr[0].languages.length>0 && i <responseStr[0].languages.length-1)
                {
                    langEl.textContent+=","
                }
       }
}

function region(responseStr)
{
document.getElementById("region").textContent="\t"+responseStr[0].region;
}
function capital(responseStr)
{
document.getElementById("capital").textContent="\t"+responseStr[0].capital;
}
function flag(responseStr)
{
             var flagImg = document.createElement('img');
            var flagContainer = document.getElementById("flag")
            flagImg.setAttribute('src', responseStr[0].flag);
            flagImg.setAttribute('alt', 'add flag');
            flagContainer.append(flagImg);
}
function vaccination(responseStr)
{
      //display required vaccination
      if (responseStr.vaccinations.length === 0) {
          var vacEl=document.createElement("p");
          console.log("Sas")

vacEl.textContent="There are no vaccinations for " + country;
document.querySelector("#vaccination").appendChild(vacEl);
        }

        for (let i = 0; i < responseStr.vaccinations.length; i++) {
            //responseStr.vaccinations
            var vacEl=document.createElement("p");
            vacEl.textContent="There are no vaccinations for " + country;
            console.log("Sas")
            document.querySelector("#vaccination").append(vacEl);
      //    console.log("name: " + responseStr.vaccinations[i].name)
        //  console.log("message: " + responseStr.vaccinations[i].message)
        }
}

window.onload = function(){
 //added flag, capital
 OverView(country)
 //display all the required info
 DisplayInfo();
};
       


