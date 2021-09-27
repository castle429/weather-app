let citySearch = document.getElementById("city-search");
let infoDisplay = document.getElementById("info-container");
let isFarenheit = true;
let farenheitToggle = document.getElementById("f-toggle");
let celsiusToggle = document.getElementById("c-toggle");

function getDataByCity(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b44cba0346714168c498fd0a82195736`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            let weather = createObjectFromData(response);
            loadInfoDisplay(weather);
        })
        .catch(function(error) {
            alert("City name not found. Please enter the name of a valid city and try again.");
        });
}

function createObjectFromData(data) {
    let cityName = data.name;
    let countryName = data.sys.country;
    let description = data.weather[0].description;
    let temp = data.main.temp;
    let feelsLike = data.main.feels_like;
    let humidity = data.main.humidity;

    let weatherObj = {
        cityName: cityName,
        countryName: countryName,
        temp: convertTempToFarenheit(temp),
        feelsLike: convertTempToFarenheit(feelsLike),
        description: description,
        humidity: humidity
    }

    return weatherObj;
}

function loadInfoDisplay(weatherObj) {
    if(infoDisplay.hasChildNodes()) {
        let infoTags = infoDisplay.children;
        console.log(infoTags.length);
        
        Object.keys(weatherObj).forEach(function(key, index) {
            console.log(weatherObj[index]);
            infoTags[index].innerHTML = weatherObj[key];
        });
        document.getElementById("humidity").innerHTML += "%";

        document.getElementById("temp").innerHTML += " °F"
        document.getElementById("feels-like").innerHTML += " °F"
        
        infoDisplay.style.visibility = "visible";
    }
}


function convertTempToCelsius(tempKelvin) {
    return Math.round(tempKelvin - 273.15);
}

function convertTempToFarenheit(tempKelvin) {
    return Math.round((tempKelvin - 273.15) * (9/5) + 32);
}

function convertFromCelsiusToFarenheit(tempCelsius) {
    return Math.round(tempCelsius * 1.8 + 32);
}

function convertFromFarenheitToCelsius(tempFarenheit) {
    return Math.round((tempFarenheit - 32) * (5/9));
}



citySearch.addEventListener("submit", function(e) {
    let cityName = document.getElementById("city-name").value;
    getDataByCity(cityName);
    document.getElementById("city-name").value = "";
    e.preventDefault();
});

farenheitToggle.addEventListener("click", function() {
    if(!(isFarenheit)) {
        let fTemp = document.getElementById("temp").innerHTML;
        fTemp = parseInt(fTemp.slice(0, 2));
        fTemp = convertFromCelsiusToFarenheit(fTemp);
        document.getElementById("temp").innerHTML = fTemp + " °F <br>";

        let fFeelsLike = document.getElementById("feels-like").innerHTML;
        fFeelsLike = parseInt(fFeelsLike.slice(0, 2));
        fFeelsLike = convertFromCelsiusToFarenheit(fFeelsLike);
        document.getElementById("feels-like").innerHTML = fFeelsLike + " °F <br>";
        
        isFarenheit = !isFarenheit;
    }
});

celsiusToggle.addEventListener("click", function() {
    if(isFarenheit) {
        let cTemp = document.getElementById("temp").innerHTML;
        cTemp = parseInt(cTemp.slice(0, 2));
        cTemp = convertFromFarenheitToCelsius(cTemp);
        document.getElementById("temp").innerHTML = cTemp + " °C <br>";
        
        let cFeelsLike = document.getElementById("feels-like").innerHTML;
        cFeelsLike = parseInt(cFeelsLike.slice(0, 2));
        cFeelsLike = convertFromFarenheitToCelsius(cFeelsLike);
        document.getElementById("feels-like").innerHTML = cFeelsLike + " °C <br>";

        isFarenheit = !isFarenheit;
    }
});



window.onload = function() {
    getDataByCity("New York");
}

// API Key
// b44cba0346714168c498fd0a82195736