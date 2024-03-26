import TetrominoController from './backend/controllers/TetrominoController.js';
import WeatherController from './backend/controllers/WeatherController.js';

document.addEventListener('DOMContentLoaded', () => {
    const tetrominoController = new TetrominoController();
    const conveyorBelt = document.getElementById('conveyorBelt');
    const weatherController = new WeatherController('beeecd8942');

    document.getElementById('checkWeatherBtn').addEventListener('click', () => {
        const city = document.getElementById('locationInput').value;
        weatherController.fetchWeatherData(city)
            .then(restrictions => displayRestrictions(restrictions));
    });
    document.getElementById('addConveyorBelt').addEventListener('click', createConveyorBelt);
    new TruckManager();

    function displayRestrictions(restrictions) {
        const resultDiv = document.getElementById('weatherResult');
        resultDiv.innerHTML = restrictions.join('<br>');
    }

    function startConveyorBelt() {
        setInterval(() => {
            const tetrominoElement = tetrominoController.drawRandomTetromino(conveyorBelt);

            // Startpositie instellen buiten het zicht van het scherm aan de linkerzijde
            let startPosition = -50; // Dit zorgt ervoor dat het 'van buiten het scherm' lijkt te komen
            tetrominoElement.style.transform = `translateX(${startPosition}px)`;

            // Begin met het verplaatsen van de tetromino langs de lopende band
            const move = () => {
                let newPosition = startPosition += 1.75; // Pas dit aan om de snelheid te veranderen
                tetrominoElement.style.transform = `translateX(${newPosition}px)`;

                // Controleer of de tetromino het einde van de conveyorBelt heeft bereikt
                if (newPosition > conveyorBelt.offsetWidth) {
                    conveyorBelt.removeChild(tetrominoElement); // Verwijder de tetromino
                } else {
                    requestAnimationFrame(move); // Blijf de tetromino bewegen
                }
            };

            move(); // Start de beweging van deze tetromino
        }, 1500); // Genereer elke 3 seconden een nieuwe tetromino
    }

    window.returnTetrominoToBelt = function(tetrominoId) {
        const tetrominoElement = document.getElementById(tetrominoId);
        // Stel opnieuw in voor animatie of maak opnieuw zichtbaar indien nodig
        tetrominoElement.style.display = 'block';
        // Eventueel extra logica om de positie van de tetromino te resetten
      };

    function createConveyorBelt() {
        const conveyorBelt = document.createElement('div');
        conveyorBelt.className = 'conveyorBelt';
        conveyorBelt.style.width = '100%';
        conveyorBelt.style.position = 'relative';
        conveyorBelt.style.overflow = 'hidden';
        conveyorBelt.style.height = '70px';
        conveyorBelt.style.marginBottom = '20px';
        conveyorBelt.style.backgroundColor = '#000';
        conveyorBelt.style.border = '1px solid #ddd';

        const conveyorBeltAnimation = document.createElement('div');
        conveyorBeltAnimation.style.position = 'absolute';
        conveyorBeltAnimation.style.top = '0';
        conveyorBeltAnimation.style.left = '0';
        conveyorBeltAnimation.style.width = '200%';
        conveyorBeltAnimation.style.height = '100%';
        conveyorBeltAnimation.style.backgroundSize = '50px 70px';
        conveyorBeltAnimation.style.backgroundImage = 'repeating-linear-gradient(-45deg, transparent, transparent 24px, grey 25px, rgb(214,210,202) 50px)';
        conveyorBeltAnimation.style.animation = 'conveyorBeltAnimation 7.5s linear infinite';

        conveyorBelt.appendChild(conveyorBeltAnimation);

        document.body.appendChild(conveyorBelt);
    }

    startConveyorBelt();
});
