

//fizza
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
var travelAPI_2=function (countryOfTravel) {
    alert("here")
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
            console.log(responseStr[0].flag);
            // will use this to display the flag
            var flagImg = document.createElement('img');
            var flagContainer = document.getElementById("flag")
            flagImg.setAttribute('src', responseStr[0].flag);
            flagImg.setAttribute('alt', 'add falf');

            console.log("jshjshsh"+flagImg)
            flagContainer.append(flagImg);
        });

}

    

