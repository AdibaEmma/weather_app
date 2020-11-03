window.addEventListener("load", () => {
    let long // longitude
    let lat // latitude
    
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let country = document.querySelector('.location-timezone span');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https:cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=21fcbd5f02de0ad45dddb98db8e31b71`;

            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    const temperature =  data.main.temp;
                    const weather = data.weather[0].description;
                    const timezone = data.name;
                    const icon  = data.weather[0].icon;
                    const country = data.sys.country;

                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather;
                    locationTimezone.textContent = timezone;
                    country.innerHTML = `, ${country}`;

                    // Celsius calculation 
                    let celsius = Math.floor((temperature - 32) * (5 / 9));

                    // Set Icon
                    document.querySelector('img').setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

                    // Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celsius;
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
            .catch(err => {
                console.log(err);
            });

        });
    } else {
        document.querySelector('location-timezone').innerHTML = "Please enable geolocation";
    }

});
