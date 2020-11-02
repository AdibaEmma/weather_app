window.addEventListener("load", () => {
    let long // longitude
    let lat // latitude
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https:cors-anywhere.herokuapp.com/";
            const api = `${proxy}apiurl`;

            fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${long}`, {
	"method": "GET",
	"headers": {
        "x-Requested-With": "XMLHttpRequest",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "6f089d65aamsh96efc9842396e9dp1be7a3jsn28600c95e48b"
	}
})
.then(res => {
	console.log(res);
})
.catch(err => {
	console.log(err);
});

        });
    } else {
        document.querySelector('location-timezone').textContent =
            "Please enable geolocation";
    }

    // function setIcons(icon, iconID) {
    //     const skycons = new skycons({ color: "white"});
    //     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    //     skycons.play();
    //     return skycons.set(iconID, Skycons[currentIcon]);
    // }

});

    // fetch(api)
    //             .then(res => {
    //                 return res.json();
    //             })
    //             .then(data => {
    //                 const {
    //                     temperature,
    //                     summary,
    //                     icon
    //                 } = data.currently;

    //                 // Set DOM Elements from the API
    //                 temperatureDegree.textContent = temperature;
    //                 temperatureDescription.textContent = summary;
    //                 locationTimezone.textContent = data.timezone;

    //                 // Celsius calculation 
    //                 let celsius = (temperature - 32) * (5 / 9);

    //                 // Set Icon
    //                 setIcons(icon, document.querySelector('.icon'));

    //                 // Change temperature to Celsius/Farenheit
    //                 temperatureSection.addEventListener('click', () => {
    //                     if(temperatureSpan.textContent === "F") {
    //                         temperatureSpan.textContent = "C";
    //                         temperatureDegree.textContent = celsius;
    //                     } else {
    //                         temperatureSpan.textContent = "F";
    //                     }
    //                 })
    //             });