class WeatherController {
    constructor(apiKey, container) {
        this.apiKey = apiKey;
        this.container = container;
        this.currentRestrictions = [];
    }

    async fetchWeatherData(city) {
        const url = `https://weerlive.nl/api/json-data-10min.php?key=${this.apiKey}&locatie=${encodeURIComponent(city)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Netwerkrespons was niet oké: ${response.statusText}`);
            }
            const data = await response.json();
            if (!data.liveweer || data.liveweer.length === 0) {
                throw new Error('Geen weerdata beschikbaar');
            }
            return this.processWeatherData(data.liveweer[0]);
        } catch (error) {
            console.error('Fout bij het ophalen van weerdata:', error);
            throw error;
        }
    }

    processWeatherData(weatherData) {
        const condition = weatherData.samenv.toLowerCase();
        const temperature = parseFloat(weatherData.temp);
        const windForce = parseInt(weatherData.windk, 10);

        this.currentRestrictions = [];

        if (condition.includes("regen") || condition.includes("sneeuw")) {
            this.currentRestrictions.push("breekbaar");
        }
        if (temperature > 35) {
            this.currentRestrictions.push("koud");
        }
        if (windForce > 7) {
            this.currentRestrictions.push("pallets");
        }

        return this.currentRestrictions;
    }

    setupWeatherCheckButton(buttonElement) {
        buttonElement.addEventListener('click', async () => {
            const city = this.container.querySelector('.locationInput').value;
            try {
                const restrictions = await this.fetchWeatherData(city);
                this.displayRestrictions(restrictions);
            } catch (error) {
                this.displayError('Kon de weerdata niet ophalen. Probeer het later opnieuw.');
            }
        });
    }

    displayRestrictions(restrictions) {
        const resultDiv = this.container.querySelector('.weatherResult');
        const restrictionMessages = {
            "breekbaar": "Breekbaar Transport rijdt niet",
            "koud": "Koud Transport rijdt niet",
            "pallets": "Palletvrachtwagen rijdt niet"
        };

        resultDiv.innerHTML = restrictions.length > 0 ?
            restrictions.map(restriction => restrictionMessages[restriction]).join('<br>') :
            "Alle vrachtwagens rijden";
    }

    displayError(message) {
        const resultDiv = this.container.querySelector('.weatherResult');
        resultDiv.innerHTML = `<span class="error">${message}</span>`;
    }

    canSendTruck(truckType) {
        this.fetchWeatherData('Amsterdam');
        return !this.currentRestrictions.includes(truckType);
    }
}

export default WeatherController;
