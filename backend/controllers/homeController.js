// HomeController.js
import TetrominoController from './TetrominoController.js';
import WeatherController from './WeatherController.js';
import TruckController from './TruckController.js';
import ConveyorBelt from '../models/ConveyorBelt.js';
import { initializeForm } from '../scripts/form.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeForm();

    const tetrominoController = new TetrominoController();
    const weatherController = new WeatherController('beeecd8942');
    const truckController1 = new TruckController();
    const conveyorBelt1 = new ConveyorBelt('conveyor1', tetrominoController);
    conveyorBelt1.draw(document.getElementById('conveyor-belt-container'));

    weatherController.setupWeatherCheckButton();

    document.getElementById('tst-toggle').addEventListener('click', () => {
        conveyorBelt1.toggleBelt();
    });

    document.getElementById('switchHallsBtn').addEventListener('click', switchHalls);

    const hallStates = {
        laadhal1: null,
        laadhal2: null,
        beltStates: {
            laadhal1: null,
            laadhal2: null
        }
    };

    let activeTruckController = truckController1;
    let activeConveyorBelt = conveyorBelt1;

    function saveHallState(hallId) {
        // Save the state of the conveyor belt
        hallStates.beltStates[hallId] = {
            isPaused: activeConveyorBelt.isPaused
        };
    }
    
    function restoreHallState(hallId) {
        // Restore the state of the conveyor belt
        if (hallStates.beltStates[hallId]) {
            if (hallStates.beltStates[hallId].isPaused) {
                activeConveyorBelt.pauseBelt();
            } else {
                activeConveyorBelt.startBelt();
            }
        }
    }

    function switchHalls() {
        const laadhal1 = document.getElementById('laadhal1');
        const laadhal2 = document.getElementById('laadhal2');

        if (!laadhal1.hasAttribute('hidden')) {
            saveHallState('laadhal1');
            laadhal1.setAttribute('hidden', '');
            if (hallStates.laadhal2) {
                restoreHallState('laadhal2');
            }
            laadhal2.removeAttribute('hidden');
        } else {
            saveHallState('laadhal2');
            laadhal2.setAttribute('hidden', '');
            if (hallStates.laadhal1) {
                restoreHallState('laadhal1');
            }
            laadhal1.removeAttribute('hidden');
        }
    }

    function initializeComponents(hall, hallId) {
        // Re-attach event listeners and reinitialize truck and weather controllers
        activeTruckController.attachFormSubmitEvent();
        weatherController.setupWeatherCheckButton();

        // Restore conveyor belt state
        if (activeConveyorBelt) {
            if (hallStates.beltStates[hallId] && hallStates.beltStates[hallId].isPaused) {
                activeConveyorBelt.pauseBelt();
            } else {
                activeConveyorBelt.startBelt();
            }
        }

        // Reattach addConveyorBelt button listener
        document.getElementById('addConveyorBelt').addEventListener('click', () => {
            if (!activeConveyorBelt) {
                activeConveyorBelt = new ConveyorBelt(`conveyor${Date.now()}`, tetrominoController);
                activeConveyorBelt.draw(hall.querySelector('#conveyor-belt-container'));
            }
        });
    }

    // Initial setup: Attach event listeners to the initial hall (laadhal1)
    initializeComponents(document.getElementById('laadhal1'), 'laadhal1');
});
