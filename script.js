import TetrominoController from './backend/controllers/TetrominoController.js';
import WeatherController from './backend/controllers/WeatherController.js';

document.addEventListener('DOMContentLoaded', () => {
    let moveB = true;
    const tetrominoController = new TetrominoController();
    const conveyorBelt = document.getElementById('conveyorBelt');
    const weatherController = new WeatherController('beeecd8942');
    const truckContainer = document.getElementById('truckContainer');
    const tetrominos = document.querySelectorAll('.tetromino');
    const tetrominoAnimationFrames = new Map();

    let bgbutton = document.getElementById('bgbutton');
    bgbutton.addEventListener('click', function () {
        moveB = !moveB;
        console.log(moveB);
    });

    tetrominos.forEach(tetromino => {
        tetromino.setAttribute('draggable', true);
        tetromino.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    });
    // Allow the truck container to receive drop events

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
            let startPosition = -50; // Start off-screen to the left
            tetrominoElement.style.transform = `translateX(${startPosition}px)`;

            const move = () => {
                let newPosition = startPosition += 0.60;
                tetrominoElement.style.transform = `translateX(${newPosition}px)`;

                if (newPosition > conveyorBelt.offsetWidth) {
                    conveyorBelt.removeChild(tetrominoElement);
                    // If the tetromino reaches the end, remove it from the map
                    tetrominoAnimationFrames.delete(tetrominoElement.id);
                } else {
                    // Save the request ID for the current frame to the map
                    tetrominoAnimationFrames.set(tetrominoElement.id, requestAnimationFrame(move));
                }
            };

            if (moveB) {
                move();
            } else {
                let blocks = conveyorBelt.childNodes;
                blocks.forEach(block => {
                    stopTetrominoMovement(block.id);
                });
            }
        }, 1500);
    }

    function stopTetrominoMovement(tetrominoId) {
        if (tetrominoAnimationFrames.has(tetrominoId)) {
            cancelAnimationFrame(tetrominoAnimationFrames.get(tetrominoId));
            tetrominoAnimationFrames.delete(tetrominoId);
        }
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
    });

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const tetrominoId = e.dataTransfer.getData('text');
        const tetromino = document.getElementById(tetrominoId);
        e.target.appendChild(tetromino);
    }

    window.returnTetrominoToBelt = function (tetrominoId) {
        const tetrominoElement = document.getElementById(tetrominoId);
        // Stel opnieuw in voor animatie of maak opnieuw zichtbaar indien nodig
        tetrominoElement.style.display = 'block';
        // Eventueel extra logica om de positie van de tetromino te resetten
    };


    // TODO: FiX
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
