class WeatherController {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    fetchWeatherData(city) {
        const url = `https://weerlive.nl/api/json-data-10min.php?key=${this.apiKey}&locatie=${encodeURIComponent(city)}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => this.processWeatherData(data.liveweer[0]))
            .catch(error => console.error('Fout bij het ophalen van weerdata:', error));
    }

    processWeatherData(weatherData) {
        const condition = weatherData.samenv.toLowerCase(); // Korte samenvatting van het weer
        const temp = parseFloat(weatherData.temp); // Temperatuur
        const windkracht = parseInt(weatherData.windk, 10); // Windsnelheid

        let transportRestrictions = [];

        if (condition.includes("regen") || condition.includes("sneeuw")) {
            transportRestrictions.push("Breekbaar Transport rijdt niet");
        }
        if (temp > 35) {
            transportRestrictions.push("Koud Transport rijdt niet");
        }
        if (windkracht > 7) { 
            transportRestrictions.push("Palletvrachtwagen rijdt niet");
        }

        return transportRestrictions;
    }

    setupWeatherCheckButton() {
        document.getElementById('checkWeatherBtn').addEventListener('click', () => {
            const city = document.getElementById('locationInput').value;
            this.fetchWeatherData(city)
                .then(restrictions => this.displayRestrictions(restrictions));
        });
    }

    displayRestrictions(restrictions) {
        const resultDiv = document.getElementById('weatherResult');
        resultDiv.innerHTML = restrictions.join('<br>');
    }
}

export default WeatherController;
